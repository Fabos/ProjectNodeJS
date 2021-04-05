"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const publicacion_controller_1 = require("../controllers/publicacion.controller");
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const validar_roles_1 = require("../middlewares/validar-roles");
const router = express_1.Router();
router.get('/', [
    validar_jwt_1.default,
    validar_roles_1.tieneRol(2),
], publicacion_controller_1.listarPublicaciones);
router.get('/categoria/:id', [
    validar_jwt_1.default,
    validar_roles_1.tieneRol(2),
], publicacion_controller_1.listarPublicacionesIdCategoria);
router.get('/usuario/:id', [
    validar_jwt_1.default,
    validar_roles_1.tieneRol(2),
], publicacion_controller_1.listarPublicacionesIdUsuario);
router.post('/', [
    validar_jwt_1.default,
    validar_roles_1.tieneRol(2),
    express_validator_1.check('publicacion', 'Debe ingresar una publicacion').not().isEmpty(),
    validar_campos_1.default
], publicacion_controller_1.postPublicacion);
router.put('/:id', [
    validar_jwt_1.default,
    validar_roles_1.tieneRol(2),
    express_validator_1.check('publicacion', 'Debe ingresar una publicacion').not().isEmpty(),
    express_validator_1.check('id', 'No es un id valido').isNumeric(),
    validar_campos_1.default
], publicacion_controller_1.putPublicacion);
router.delete('/:id', [
    validar_jwt_1.default,
    validar_roles_1.tieneRol(1, 2),
    express_validator_1.check('id', 'No es un id valido').isNumeric(),
    validar_campos_1.default
], publicacion_controller_1.deletePublicacion);
exports.default = router;
//# sourceMappingURL=publicacion.route.js.map