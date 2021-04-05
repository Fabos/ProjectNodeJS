import { Request, Response } from "express";

import Publicacion from "../models/publicacion";
import Usuario from "../models/usuario";
import Categoria from '../models/categoria';

export const listarPublicaciones = async (req: Request, res: Response) => {
    
    const publicaciones = await Publicacion.findAll({
        where: { estado: true },
        include: [Usuario, Categoria]
        
    });


    
    res.json({
        publicacion: publicaciones,

    })
}

export const listarPublicacionesIdCategoria = async (req: Request, res: Response) => {
    
    const { id } = req.params;
    
    const publicaciones = await Publicacion.findAll({
        where: { estado: true, CategoriaId: id},
        include: [Usuario, Categoria]
    });

    res.json({
        publicacion: publicaciones,

    })
}

export const listarPublicacionesIdUsuario = async (req: Request, res: Response) => {
    
    const { id , uid} = req.params;
    
    const publicaciones = await Publicacion.findAll({
        where: { estado: true, UsuarioId: uid},
        include: [Usuario, Categoria]
    });

    res.json({
        publicacion: publicaciones,

    })
}

export const postPublicacion = async (req: Request, res: Response) => {
    const { publicacion, categoria} = req.body;
    const { uid } = req.params;
    try {

        const publicacionn = await Publicacion.create({
            publicacion: publicacion,
            estado: true,
            UsuarioId:uid,
            CategoriaId:categoria
        });
        res.json({
            publicacionn
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}


export const putPublicacion = async (req: Request, res: Response) => {
    const { params } = req;

    const { id, createdAt, updateAt, usuario_id, ...body  } = req.body;
    try {


        //Actualizar categoria
        const publicacion = await Publicacion.findByPk(params.id);
        await publicacion!.update(body);

        //Respuesta al front
        res.json({
            publicacion: publicacion
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const deletePublicacion = async (req: Request, res: Response) => {
    const { id, uid, usuario } = req.params;

    try {

        const publicacion = await Publicacion.findByPk(id);

        if (!publicacion) {
            return res.status(401).json({
                msg:"No se encontró ninguna categoria"
            })
            
        }

        //BORRAR DE BD
        // await user.destroy();

        //Cambiar estado de la categoria
        await publicacion!.update({
            estado: false
        });

        const usuarioAutenticado = req.params.usuario;

        res.json({
            publicacion: publicacion,
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
