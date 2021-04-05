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
exports.existeCategoria = exports.existeUsuario = exports.emailExiste = exports.rolValido = void 0;
const categoria_1 = __importDefault(require("../models/categoria"));
const rol_1 = __importDefault(require("../models/rol"));
const usuario_1 = __importDefault(require("../models/usuario"));
//Verificar rol existe
const rolValido = (rol_id = 0) => __awaiter(void 0, void 0, void 0, function* () {
    const existeRol = yield rol_1.default.findOne({
        where: { id: rol_id }
    });
    if (!existeRol) {
        throw new Error(`Por favor verifique el rol`);
    }
});
exports.rolValido = rolValido;
//Verificar email existe
const emailExiste = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const existeEmail = yield usuario_1.default.findOne({
        where: { email: email }
    });
    if (existeEmail) {
        throw new Error(`Ya existe un usuario con ese email: ${email}`);
    }
});
exports.emailExiste = emailExiste;
//Verificar existe usuario
const existeUsuario = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existeUsuario = yield usuario_1.default.findOne({
        where: { id: id }
    });
    if (!existeUsuario) {
        throw new Error(`No existe un usuario para ese id: ${id}`);
    }
});
exports.existeUsuario = existeUsuario;
//Verificar existe categoria
const existeCategoria = (categoria) => __awaiter(void 0, void 0, void 0, function* () {
    const existeUsuario = yield categoria_1.default.findOne({
        where: { categoria: categoria }
    });
    if (existeUsuario) {
        throw new Error(`Ya existe la categoria con el nombre: ${categoria}`);
    }
});
exports.existeCategoria = existeCategoria;
exports.default = { rolValido: exports.rolValido, emailExiste: exports.emailExiste, existeUsuario: exports.existeUsuario };
//# sourceMappingURL=db-validators.js.map