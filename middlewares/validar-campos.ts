import { validationResult } from "express-validator";
import * as express from 'express';



const validarCampos = (req:express.Request, res:express.Response, next:express.NextFunction)=>{

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json(errors);
    }
    next();
}

export default validarCampos;