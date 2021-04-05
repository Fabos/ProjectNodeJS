"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuario_1 = __importDefault(require("../models/usuario"));
const validarJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            "errors": [
                { "msg": "No se envio el token." }
            ]
        });
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.SECRETORPRIVATEKEY);
        const uidAutenticado = payload.uid;
        //consultar usuario autenticado
        const usuario = yield usuario_1.default.findByPk(uidAutenticado);
        if (!usuario) {
            return res.status(400).json({
                "errors": [
                    { "msg": "Token no valido. Usuario no existe" }
                ]
            });
        }
        //Convertir modelo a objeto
        const oUsuario = usuario.get({ plain: true });
        //verificar Usuario si atenticado esta activo
        if (!oUsuario.estado) {
            return res.status(400).json({
                "errors": [
                    { "msg": "Usuario inhabilitado" }
                ]
            });
        }
        //Asignar objeto usuario a request
        req.params.usuario = oUsuario;
        req.params.uid = payload.uid;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            msg: error
        });
    }
});
exports.default = validarJWT;
//# sourceMappingURL=validar-jwt.js.map