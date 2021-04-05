import express from 'express';
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario';

const validarJWT = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            "errors": [
                { "msg": "No se envio el token." }
                ]
            });
    }

    try {

        const payload = jwt.verify(token!, process.env.SECRETORPRIVATEKEY!);
        const uidAutenticado = (<any>payload).uid;

        

        //consultar usuario autenticado
        const usuario = await Usuario.findByPk(uidAutenticado);

        if (!usuario) {
            return res.status(400).json({
                "errors": [
                    { "msg": "Token no valido. Usuario no existe" }
                    ]
                });
        }
        //Convertir modelo a objeto
        const oUsuario = usuario!.get({ plain: true });

        //verificar Usuario si atenticado esta activo
        if (!oUsuario.estado) {
            return res.status(400).json({
                "errors": [
                    { "msg": "Usuario inhabilitado" }
                    ]
                });
        }


        //Asignar objeto usuario a request
        req.params.usuario = oUsuario
        req.params.uid = (<any>payload).uid

        next();





    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: error
        });


    }

}

export default validarJWT;