import { NextFunction, Request, Response } from "express";
import * as yup from "yup";

const tratarErroValidacaoYup = (
    esquema: yup.Schema<unknown>,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        esquema.validateSync(req.body, { abortEarly: false})
        next();
      } catch (error) {
        const yupErrors = error as yup.ValidationError;
        const validationErrors: Record<string, string> = {};
        yupErrors.inner.forEach((error) => {
          if(error.path) {
            validationErrors[error.path] = error.message;
          }
        });

        return res.status(400).json({ error: validationErrors });
      }
}

export default tratarErroValidacaoYup;