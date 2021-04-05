"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tieneRol = exports.adminRol = void 0;
const adminRol = (req, res, next) => {
    if (!req.params.usuario) {
        return res.status(500).json("Se quiere verificar el rol sin validar el token primero");
    }
    const userModel = req.params.usuario;
    const usuario = userModel;
    console.log(usuario.rol_id);
    if (usuario.rol_id !== 1) {
        return res.status(400).json({
            "errors": [
                { "msg": "Se requiere ser Administrador" }
            ]
        });
    }
    next();
};
exports.adminRol = adminRol;
const tieneRol = (...roles) => {
    return (req, res, next) => {
        if (!req.params.usuario) {
            return res.status(500).json("Se quiere verificar el rol sin validar el token primero");
        }
        const userModel = req.params.usuario;
        const usuario = userModel;
        if (!roles.includes(usuario.rol_id)) {
            res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            });
        }
        next();
    };
};
exports.tieneRol = tieneRol;
exports.default = { adminRol: exports.adminRol, tieneRol: exports.tieneRol };
//# sourceMappingURL=validar-roles.js.map