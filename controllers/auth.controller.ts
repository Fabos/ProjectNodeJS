import { Request, Response } from "express";
import Usuario from '../models/usuario';
import bcryptjs from 'bcryptjs';
import generarJWT from "../helpers/generar-jwt";


export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body;
    

    try {

        //Buscar usuario por email
        const usuario = await Usuario.findOne({
            where: { email: email },
        });
 

        //Validar existe usuario
        if (!usuario) {
            return res.status(400).json({
                "errors": [
                    { "msg": "Usuario o password no son correctos" }
                    ]
                });
        }

        //Convertir modelo a objeto
        const oUsuario = usuario!.get({ plain: true });




        //Validar estado del usuario
        if (!oUsuario.estado) {
            return res.status(400).json({
                "errors": [
                    { "msg": ' actualmente inhabilitado' }
                    ]
                });
        }

        //Validar Password
        const validPassword = bcryptjs.compareSync(password, oUsuario.password);

        if (!validPassword) {
            return res.status(400).json({
                "errors": [
                    { "msg": 'Usuario o contraseña incorrecta' }
                    ]
                });
        }

        //Generar JWT
        console.log("PRINT LOGIN");
        

        const token = await generarJWT(oUsuario.id);
        console.log("PRINT LOGIN");
        console.log(token);


        res.json({
            usuario,
            token
        })

    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador',
        })
    }

}