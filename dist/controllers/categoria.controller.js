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
exports.deleteCategoria = exports.putCategoria = exports.postCategoria = exports.listarCategoriaId = exports.listarCategorias = exports.listarCategoriasAdmin = void 0;
const categoria_1 = __importDefault(require("../models/categoria"));
const listarCategoriasAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categorias = yield categoria_1.default.findAll();
    res.json({
        categoria: categorias
    });
});
exports.listarCategoriasAdmin = listarCategoriasAdmin;
const listarCategorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categorias = yield categoria_1.default.findAll({
        where: { estado: true }
    });
    res.json({
        categoria: categorias
    });
});
exports.listarCategorias = listarCategorias;
const listarCategoriaId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const categoria = yield categoria_1.default.findByPk(id);
    if (categoria) {
        res.json({
            msg: 'get categoria',
            categoria: categoria
        });
    }
    else {
        return res.status(400).json({
            "errors": [
                { "msg": "No existe la categoria con ese id" }
            ]
        });
    }
});
exports.listarCategoriaId = listarCategoriaId;
const postCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoria } = req.body;
    try {
        const categoriaC = yield categoria_1.default.create({
            categoria: categoria,
            estado: true,
        });
        res.json({
            categoriaC
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.postCategoria = postCategoria;
const putCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params } = req;
    const { body } = req;
    try {
        //Actualizar categoria
        const categoria = yield categoria_1.default.findByPk(params.id);
        yield categoria.update(body);
        //Respuesta al front
        res.json({
            usuario: categoria
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.putCategoria = putCategoria;
const deleteCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, uid, usuario } = req.params;
    try {
        const categoria = yield categoria_1.default.findByPk(id);
        if (!categoria) {
            return res.status(401).json({
                msg: "No se encontró ninguna categoria"
            });
        }
        //BORRAR DE BD
        // await user.destroy();
        //Cambiar estado de la categoria
        yield categoria.update({
            estado: false
        });
        const usuarioAutenticado = req.params.usuario;
        res.json({
            categoria: categoria,
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
exports.deleteCategoria = deleteCategoria;
//# sourceMappingURL=categoria.controller.js.map