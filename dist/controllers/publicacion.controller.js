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
exports.deletePublicacion = exports.putPublicacion = exports.postPublicacion = exports.listarPublicacionesIdUsuario = exports.listarPublicacionesIdCategoria = exports.listarPublicaciones = void 0;
const publicacion_1 = __importDefault(require("../models/publicacion"));
const usuario_1 = __importDefault(require("../models/usuario"));
const categoria_1 = __importDefault(require("../models/categoria"));
const listarPublicaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const publicaciones = yield publicacion_1.default.findAll({
        where: { estado: true },
        include: [usuario_1.default, categoria_1.default]
    });
    res.json({
        publicacion: publicaciones,
    });
});
exports.listarPublicaciones = listarPublicaciones;
const listarPublicacionesIdCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const publicaciones = yield publicacion_1.default.findAll({
        where: { estado: true, CategoriaId: id },
        include: [usuario_1.default, categoria_1.default]
    });
    res.json({
        publicacion: publicaciones,
    });
});
exports.listarPublicacionesIdCategoria = listarPublicacionesIdCategoria;
const listarPublicacionesIdUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, uid } = req.params;
    const publicaciones = yield publicacion_1.default.findAll({
        where: { estado: true, UsuarioId: uid },
        include: [usuario_1.default, categoria_1.default]
    });
    res.json({
        publicacion: publicaciones,
    });
});
exports.listarPublicacionesIdUsuario = listarPublicacionesIdUsuario;
const postPublicacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { publicacion, categoria } = req.body;
    const { uid } = req.params;
    try {
        const publicacionn = yield publicacion_1.default.create({
            publicacion: publicacion,
            estado: true,
            UsuarioId: uid,
            CategoriaId: categoria
        });
        res.json({
            publicacionn
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.postPublicacion = postPublicacion;
const putPublicacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params } = req;
    const _a = req.body, { id, createdAt, updateAt, usuario_id } = _a, body = __rest(_a, ["id", "createdAt", "updateAt", "usuario_id"]);
    try {
        //Actualizar categoria
        const publicacion = yield publicacion_1.default.findByPk(params.id);
        yield publicacion.update(body);
        //Respuesta al front
        res.json({
            publicacion: publicacion
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.putPublicacion = putPublicacion;
const deletePublicacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, uid, usuario } = req.params;
    try {
        const publicacion = yield publicacion_1.default.findByPk(id);
        if (!publicacion) {
            return res.status(401).json({
                msg: "No se encontró ninguna categoria"
            });
        }
        //BORRAR DE BD
        // await user.destroy();
        //Cambiar estado de la categoria
        yield publicacion.update({
            estado: false
        });
        const usuarioAutenticado = req.params.usuario;
        res.json({
            publicacion: publicacion,
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
exports.deletePublicacion = deletePublicacion;
//# sourceMappingURL=publicacion.controller.js.map