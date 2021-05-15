import { Request, Response } from "express";
import Usuario from '../models/usuario';
import bcryptjs from 'bcryptjs';
import Puntaje from "../models/puntaje";
import { Sequelize } from 'sequelize';

export const getUsuarios = async (req: Request, res: Response) => {
    const usuarios = await Usuario.findAll({
        where: { estado: true }
    });
    
    res.json({
        msg: 'get Usuarios',
        usuarios: usuarios
    })
}

export const getUsuariosPuntaje = async (req: Request, res: Response) => {
    const usuarios = await Puntaje.findAll({
        attributes : [ [Sequelize.fn('AVG', Sequelize.col('Puntajes.puntaje')),'promedio'] ],
        include: [Usuario],
        group: ['Usuario.id']
    });
    
    res.json({
        msg: 'get Usuarios',
        usuarios: usuarios
    })
}

export const postUsuarioVoto = async (req: Request, res: Response) => {
    const { puntaje, usuarioId } = req.body;
    const { uid } = req.params;
    try {

        const voto = await Puntaje.create({
            puntaje: puntaje,
            UsuarioId:usuarioId,
        });
        res.json({
            voto
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const getUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if (usuario) {
        res.json({
            msg: 'get Usuario',
            usuarios: usuario
        })
    }
    else {
        res.status(404).json({
            msg: `No existe el usuario con el id ${id}`
        });
    }
}

export const postUsuario = async (req: Request, res: Response) => {
    const { nombre, email, password } = req.body;
    try {
        //Encriptar password
        const dificultad = bcryptjs.genSaltSync();

        const usuario = await Usuario.create({
            nombre: nombre,
            email: email,
            password: bcryptjs.hashSync(password, dificultad),
            rol_id: 2,
            estado: true
        });
        res.json({
            usuario
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const putUsuario = async (req: Request, res: Response) => {
    const { params } = req;

    const {  password, id, rol_id, estado, ...body } = req.body;
    try {


        if (password) {
            //Encriptar password
            const dificultad = bcryptjs.genSaltSync();
            body.password = bcryptjs.hashSync(password, dificultad);
        }

        //Actualizar usuario
        const user = await Usuario.findByPk(params.id);
        await user!.update(body);

        //Respuesta al front
        res.json({
            usuario: user
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const deleteUsuario = async (req: Request, res: Response) => {
    const { id, uid, usuario } = req.params;

    try {

        const user = await Usuario.findByPk(id);

        //BORRAR DE BD
        // await user.destroy();

        //Cambiar estado del usuario
        await user!.update({
            estado: false
        });

        const usuarioAutenticado = req.params.usuario;

        res.json({
            usuario: user,
            uid: uid,
            autenticado: usuarioAutenticado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })

    }

}
