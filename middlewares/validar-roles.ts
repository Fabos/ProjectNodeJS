import express from "express";

export const adminRol = (req: express.Request, res: express.Response, next: express.NextFunction) => {

    if (!req.params.usuario) {
        return res.status(500).json("Se quiere verificar el rol sin validar el token primero");
    }

    const userModel = req.params.usuario;
    const usuario = (<any>userModel);

    console.log(usuario.rol_id);
    

    if (usuario.rol_id !== 1) {
        return res.status(400).json({
            "errors": [
                { "msg": "Se requiere ser Administrador" }
                ]
            });
    }
    
    next();

}

export const tieneRol = (...roles:number[]) => {

    return (req: express.Request, res: express.Response, next: express.NextFunction)=>{


        if (!req.params.usuario) {
            return res.status(500).json("Se quiere verificar el rol sin validar el token primero");
        }
    
        const userModel = req.params.usuario;
        const usuario = (<any>userModel);

        if (!roles.includes(usuario.rol_id)) {
            res.status(401).json({
               msg: `El servicio requiere uno de estos roles ${roles}`
            })
            
        }

        

    next();

    }
}


export default {adminRol, tieneRol};