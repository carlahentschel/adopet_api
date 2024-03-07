import { Request, Response } from "express-serve-static-core";
import AdotanteEntity from "../entities/AdotanteEntity";
import AdotanteRepository from "../repositories/AdotanteRepository";
import EnderecoEntity from "../entities/EnderecoEntity";
import * as yup from "yup";
import { TipoRequestBodyAdotante, TipoRequestParamsAdotante, TipoResponseBodyAdotante } from "../types/tiposAdotante";

const adotanteBodyValidator: yup.ObjectSchema<Omit<TipoRequestBodyAdotante, "endereco">> = 
  yup.object({
    nome: yup.string().defined().required("O nome é obrigatório."),
    celular: yup.string().defined().required(),
    senha: yup.string().defined().required().min(6),
    foto: yup.string().optional(),
  });
  /* o omit foi usado aqui e não no arquivo 'tipoAdotante.ts'(linha 3), pois para criar o 
  adotante, queremos dar a possibilidade pro usuário preencher o endereço (apesar de ser 
  opcional) */
  /* 
    Exemplo:
    {
      "nome": "Carla",
      "celular": "999998888",
      "senha": "123456",
      "foto": "foto.jpg",
      "endereco": "Rua A, 12"
    }

    {
                                  -> null?
      "celular": "",              -> string vazia?
      "senha": ,                  -> undefined?
      "foto": "foto.jpg",
      "endereco": "Rua A, 12"
    }
  */

export default class AdotanteController {
    constructor(private repository: AdotanteRepository) {}

    async criaAdotante(
      req: Request<{}, {}, TipoRequestBodyAdotante>, 
      res: Response<TipoResponseBodyAdotante>
    ) {
      

        const { nome, celular, endereco, foto, senha } = <AdotanteEntity>req.body;
        let bodyValidated: TipoRequestBodyAdotante;

        try {
          bodyValidated = await adotanteBodyValidator.validate(req.body, {
            abortEarly: false
          })
        } catch (error) {
          const yupErrors = error as yup.ValidationError;
          const validationErrors: Record<string, string> = {};

          yupErrors.inner.forEach((error) => {
            if(!error.path) return;
            validationErrors[error.path] = error.message;
          })

          return res.status(400).json({ error: validationErrors });
        }
    
        const novoAdotante = new AdotanteEntity(
            nome,
            senha,
            celular,
            foto,
            endereco
        );
    
        await this.repository.criaAdotante(novoAdotante);
        return res.status(201).json({data: {id: novoAdotante.id, nome, celular} });
    }

    async atualizaAdotante(
      req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>, 
      res: Response<TipoResponseBodyAdotante>
    ) {
        const { id } = req.params;
        const { success, message } = await this.repository.atualizaAdotante(
          Number(id),
          req.body as AdotanteEntity
        );
    
        if (!success) {
          return res.status(404).json({ error: message });
        }
    
        return res.sendStatus(204);
    }

    async listaAdotantes(
      req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>, 
      res: Response<TipoResponseBodyAdotante>
    ) {
        const listaDeAdotantes = await this.repository.listaAdotantes();
        const data = listaDeAdotantes.map((adotante) => {
          return {
            id: adotante.id,
            nome: adotante.nome,
            celular: adotante.celular,
          }
        })
        return res.json({data});
    }

    async deletaAdotante(
      req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>, 
      res: Response<TipoResponseBodyAdotante>
    ) {
        const { id } = req.params;
    
        const { success, message } = await this.repository.deletaAdotante(
          Number(id)
        );
    
        if (!success) {
          return res.status(404).json({ error: message });
        }
        return res.sendStatus(204);
    }

    async atualizaEnderecoAdotante(
      req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>, 
      res: Response<TipoResponseBodyAdotante>
    ) {
      const { id } = req.params;
  
      const { success, message } = await this.repository.atualizaEnderecoAdotante(
        Number(id),
        req.body.endereco as EnderecoEntity
      );
  
      if (!success) {
        return res.status(404).json({ error: message });
      }
      return res.sendStatus(204);
  }
 
}