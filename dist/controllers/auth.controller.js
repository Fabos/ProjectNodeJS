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
exports.login = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generar_jwt_1 = __importDefault(require("../helpers/generar-jwt"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        //Buscar usuario por email
        const usuario = yield usuario_1.default.findOne({
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
        const oUsuario = usuario.get({ plain: true });
        //Validar estado del usuario
        if (!oUsuario.estado) {
            return res.status(400).json({
                "errors": [
                    { "msg": ' actualmente inhabilitado' }
                ]
            });
        }
        //Validar Password
        const validPassword = bcryptjs_1.default.compareSync(password, oUsuario.password);
        if (!validPassword) {
            return res.status(400).json({
                "errors": [
                    { "msg": 'Usuario o contraseña incorrecta' }
                ]
            });
        }
        //Generar JWT
        console.log("PRINT LOGIN");
        const token = yield generar_jwt_1.default(oUsuario.id);
        console.log("PRINT LOGIN");
        console.log(token);
        res.json({
            usuario,
            token
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
});
exports.login = login;
//# sourceMappingURL=auth.controller.js.map