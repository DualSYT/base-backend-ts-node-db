import {validationResult} from "express-validator"
import {Request, Response, NextFunction} from 'express'
import { Logger } from "../lib/logger"
    // no es mas que una funcion, tiene un tercer argumento
const validarCampos = (req: Request, res:Response,  next:NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        Logger.error(`Errores en validacion: ${JSON.stringify(errors)}`,{
            labels: {
            module: 'middleware-validar-campos', 
            }})
        return res.status(400).json({
            status: 400,
            info: "Error en los datos",
            errors
        })
    }
    next()
}

export {validarCampos}