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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.postUsuarioVoto = exports.getUsuariosPuntaje = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const puntaje_1 = __importDefault(require("../models/puntaje"));
const sequelize_1 = require("sequelize");
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.findAll({
        where: { estado: true }
    });
    res.json({
        msg: 'get Usuarios',
        usuarios: usuarios
    });
});
exports.getUsuarios = getUsuarios;
const getUsuariosPuntaje = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield puntaje_1.default.findAll({
        attributes: [[sequelize_1.Sequelize.fn('AVG', sequelize_1.Sequelize.col('Puntajes.puntaje')), 'promedio']],
        include: [usuario_1.default],
        group: ['Usuario.id']
    });
    res.json({
        msg: 'get Usuarios',
        usuarios: usuarios
    });
});
exports.getUsuariosPuntaje = getUsuariosPuntaje;
const postUsuarioVoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { puntaje, usuarioId } = req.body;
    const { uid } = req.params;
    try {
        const voto = yield puntaje_1.default.create({
            puntaje: puntaje,
            UsuarioId: usuarioId,
        });
        res.json({
            voto
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.postUsuarioVoto = postUsuarioVoto;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (usuario) {
        res.json({
            msg: 'get Usuario',
            usuarios: usuario
        });
    }
    else {
        res.status(404).json({
            msg: `No existe el usuario con el id ${id}`
        });
    }
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, email, password } = req.body;
    try {
        //Encriptar password
        const dificultad = bcryptjs_1.default.genSaltSync();
        const usuario = yield usuario_1.default.create({
            nombre: nombre,
            email: email,
            password: bcryptjs_1.default.hashSync(password, dificultad),
            rol_id: 2,
            estado: true
        });
        res.json({
            usuario
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params } = req;
    const _a = req.body, { password, id, rol_id, estado } = _a, body = __rest(_a, ["password", "id", "rol_id", "estado"]);
    try {
        if (password) {
            //Encriptar password
            const dificultad = bcryptjs_1.default.genSaltSync();
            body.password = bcryptjs_1.default.hashSync(password, dificultad);
        }
        //Actualizar usuario
        const user = yield usuario_1.default.findByPk(params.id);
        yield user.update(body);
        //Respuesta al front
        res.json({
            usuario: user
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, uid, usuario } = req.params;
    try {
        const user = yield usuario_1.default.findByPk(id);
        //BORRAR DE BD
        // await user.destroy();
        //Cambiar estado del usuario
        yield user.update({
            estado: false
        });
        const usuarioAutenticado = req.params.usuario;
        res.json({
            usuario: user,
            uid: uid,
            autenticado: usuarioAutenticado
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuario.controller.js.map