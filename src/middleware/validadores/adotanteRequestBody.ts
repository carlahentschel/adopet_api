import { NextFunction, Request, Response } from "express";
import { TipoRequestBodyAdotante } from "../../types/tiposAdotante";
import * as yup from "yup";

const esquemaBodyValidator: yup.ObjectSchema<Omit<TipoRequestBodyAdotante, "endereco">> = 
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

const middlewareValidadorBodyAdotante = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await esquemaBodyValidator.validate(req.body, {
          abortEarly: false
        })
        return next();
      } catch (error) {
        const yupErrors = error as yup.ValidationError;
        const validationErrors: Record<string, string> = {};

        yupErrors.inner.forEach((error) => {
          if(!error.path) return;
          validationErrors[error.path] = error.message;
        })

        return res.status(400).json({ error: validationErrors });
      }
}

export {middlewareValidadorBodyAdotante};