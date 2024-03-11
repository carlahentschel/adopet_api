import { Request, Response } from "express-serve-static-core";
import EnderecoEntity from "../entities/EnderecoEntity";
import AbrigoRepository from "../repositories/AbrigoRepository";
import { TipoRequestBodyAbrigo, TipoRequestParamsAbrigo, TipoResponseBodyAbrigo } from "../types/tiposAbrigo";
import AbrigoEntity from "../entities/AbrigoEntity";
import { EnumHttpStatusCode } from "../enum/EnumHttpStatusCode";

export default class AbrigoController {
    constructor(private repository: AbrigoRepository) {}

    async criaAbrigo(
      req: Request<{}, {}, TipoRequestBodyAbrigo>, 
      res: Response<TipoResponseBodyAbrigo>
    ) {
        const { nome, email, celular, senha, endereco } = <AbrigoEntity>req.body;

        const novoAbrigo = new AbrigoEntity(
            nome,
            email,
            celular,
            senha,
            endereco
        );
    
        await this.repository.criaAbrigo(novoAbrigo);
        return res.status(201).json({data: {id: novoAbrigo.id, nome, email, celular, endereco} });
    }

    async atualizaAbrigo(
      req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>, 
      res: Response<TipoResponseBodyAbrigo>
    ) {
        const { id } = req.params;
        await this.repository.atualizaAbrigo(
          Number(id),
          req.body as AbrigoEntity
        );

        return res.sendStatus(204);
    }

    async listaAbrigos(
      req: Request<{}, {}, {}>, 
      res: Response<TipoResponseBodyAbrigo>
    ) {
        const listaDeAbrigos = await this.repository.listaAbrigos();
        const data = listaDeAbrigos.map((abrigo) => {
          return {
            id: abrigo.id,
            nome: abrigo.nome,
            email: abrigo.email,
            celular: abrigo.celular,
            endereco: abrigo.endereco !== null ? abrigo.endereco:undefined
          }
        })
        return res.json({data});
    }

    async deletaAbrigo(
      req: Request<TipoRequestParamsAbrigo, {}, {}>, 
      res: Response<TipoResponseBodyAbrigo>
    ) {
        const { id } = req.params;
        await this.repository.deletaAbrigo(Number(id));

        return res.sendStatus(EnumHttpStatusCode.NO_CONTENT);
    }

    async atualizaEnderecoAbrigo(
      req: Request<TipoRequestParamsAbrigo, {}, EnderecoEntity>, 
      res: Response<TipoResponseBodyAbrigo>
    ) {
      const { id } = req.params;
      await this.repository.atualizaEnderecoAbrigo(
        Number(id),
        req.body
      );

      return res.sendStatus(EnumHttpStatusCode.OK);
  }
 
}