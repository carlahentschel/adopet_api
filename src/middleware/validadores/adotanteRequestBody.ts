import { NextFunction, Request, Response } from "express";
import { TipoRequestBodyAdotante } from "../../types/tiposAdotante";
import * as yup from "yup";
import {pt} from "yup-locale-pt";
import tratarErroValidacaoYup from "../../utils/trataValidacaoYup";

yup.setLocale(pt);

const esquemaBodyAdotante: yup.ObjectSchema<Omit<TipoRequestBodyAdotante, "endereco">> = 
  yup.object({
    nome: yup.string().required(),
    celular: yup
      .string()
      .defined()
      .required()
      .matches(
        /^(\(?[0-9]{2}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm, 
        "Celular inválido"
    ),
    senha: yup
      .string()
      .required()
      .min(6)
      .matches(
        /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm
    ),
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
                                  -> undefined
      "celular": "",              -> string vazia?
      "senha": null,              -> null
      "foto": "foto.jpg",
      "endereco": "Rua A, 12"
    }
  */

const middlewareValidadorBodyAdotante = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
   tratarErroValidacaoYup(esquemaBodyAdotante, req, res, next);
}

export {middlewareValidadorBodyAdotante};