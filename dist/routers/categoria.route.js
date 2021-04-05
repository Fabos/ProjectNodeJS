"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const categoria_controller_1 = require("../controllers/categoria.controller");
const db_validators_1 = require("../helpers/db-validators");
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const validar_roles_1 = require("../middlewares/validar-roles");
const router = express_1.Router();
router.get('/', [
    validar_jwt_1.default
], categoria_controller_1.listarCategorias);
router.get('/admin', [
    validar_jwt_1.default,
    validar_roles_1.adminRol,
], categoria_controller_1.listarCategoriasAdmin);
router.get('/:id', [validar_jwt_1.default], categoria_controller_1.listarCategoriaId);
router.post('/', [
    validar_jwt_1.default,
    validar_roles_1.adminRol,
    express_validator_1.check('categoria', 'Debe ingresar una categoria').not().isEmpty(),
    express_validator_1.check('categoria').custom(db_validators_1.existeCategoria),
    validar_campos_1.default
], categoria_controller_1.postCategoria);
router.put('/:id', [
    validar_jwt_1.default,
    validar_roles_1.adminRol,
    express_validator_1.check('categoria', 'Debe ingresar una categoria').not().isEmpty(),
    express_validator_1.check('categoria').custom(db_validators_1.existeCategoria),
    express_validator_1.check('id', 'No es un id valido').isNumeric(),
    validar_campos_1.default
], categoria_controller_1.putCategoria);
router.delete('/:id', [
    validar_jwt_1.default,
    validar_roles_1.adminRol,
    validar_jwt_1.default,
    validar_roles_1.adminRol,
    express_validator_1.check('id', 'No es un id valido').isNumeric(),
    validar_campos_1.default
], categoria_controller_1.deleteCategoria);
exports.default = router;
//# sourceMappingURL=categoria.route.js.map