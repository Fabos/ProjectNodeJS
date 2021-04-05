import { Request, Response } from "express";
import Categoria from '../models/categoria';


export const listarCategoriasAdmin = async (req: Request, res: Response) => {
    
    const categorias = await Categoria.findAll();
    
    res.json({
        categoria: categorias
    })
}

export const listarCategorias = async (req: Request, res: Response) => {
    
    const categorias = await Categoria.findAll({
        where: { estado: true }
    });
    
    res.json({
        categoria: categorias
    })
}

export const listarCategoriaId = async (req: Request, res: Response) => {
    
    const { id } = req.params;

    const categoria = await Categoria.findByPk(id);

    if (categoria) {
        res.json({
            msg: 'get categoria',
            categoria: categoria
        })
    }
    else {
        return res.status(400).json({
            "errors": [
                { "msg": "No existe la categoria con ese id" }
                ]
            });
    }
}


export const postCategoria = async (req: Request, res: Response) => {
    const { categoria } = req.body;


    try {

        const categoriaC = await Categoria.create({
            categoria: categoria,
            estado: true,
        });
        res.json({
            categoriaC
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}


export const putCategoria = async (req: Request, res: Response) => {
    const { params } = req;

    const {  body } = req;
    try {


        //Actualizar categoria
        const categoria = await Categoria.findByPk(params.id);
        await categoria!.update(body);

        //Respuesta al front
        res.json({
            usuario: categoria
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const deleteCategoria = async (req: Request, res: Response) => {
    const { id, uid, usuario } = req.params;

    try {

        const categoria = await Categoria.findByPk(id);

        if (!categoria) {
            return res.status(401).json({
                msg:"No se encontró ninguna categoria"
            })
            
        }

        //BORRAR DE BD
        // await user.destroy();

        //Cambiar estado de la categoria
        await categoria!.update({
            estado: false
        });

        const usuarioAutenticado = req.params.usuario;

        res.json({
            categoria: categoria,
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
