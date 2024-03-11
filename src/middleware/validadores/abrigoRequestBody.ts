import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import {pt} from "yup-locale-pt";
import tratarErroValidacaoYup from "../../utils/trataValidacaoYup";
import { TipoRequestBodyAbrigo } from "../../types/tiposAbrigo";

yup.setLocale(pt);

const esquemaBodyAbrigo: yup.ObjectSchema<Omit<TipoRequestBodyAbrigo, "endereco">> = 
  yup.object({
    nome: yup.string().required(),
    email: yup.string().email().required(),
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
    endereco: yup.string().optional(),
  });
 
const middlewareValidadorBodyAbrigo = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
   tratarErroValidacaoYup(esquemaBodyAbrigo, req, res, next);
}

export {middlewareValidadorBodyAbrigo};