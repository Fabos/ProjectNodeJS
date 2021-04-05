"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const usuario_controller_1 = require("../controllers/usuario.controller");
const db_validators_1 = require("../helpers/db-validators");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const validar_roles_1 = require("../middlewares/validar-roles");
const router = express_1.Router();
router.get('/', [
    validar_jwt_1.default,
    validar_roles_1.adminRol,
], usuario_controller_1.getUsuarios);
router.get('/:id', [
    validar_jwt_1.default,
    validar_roles_1.tieneRol(1, 2),
], usuario_controller_1.getUsuario);
router.post('/', [
    express_validator_1.check('email', 'El email no es valido').isEmail(),
    express_validator_1.check('password', 'El password debe tener mas de 6 caracteres').isLength({ min: 6 }),
    express_validator_1.check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    express_validator_1.check('email').custom(db_validators_1.emailExiste),
    // check('rol', 'El rol no es permitido').isIn(['Administrador', 'Usuario']),
    validar_campos_1.default
], usuario_controller_1.postUsuario);
router.put('/:id', [
    validar_jwt_1.default,
    validar_roles_1.tieneRol(2),
    express_validator_1.check('id', 'No es un id valido').isNumeric(),
    express_validator_1.check('id').custom(db_validators_1.existeUsuario),
    validar_campos_1.default
], usuario_controller_1.putUsuario);
router.delete('/:id', [
    validar_jwt_1.default,
    // adminRol,
    validar_roles_1.tieneRol(2),
    express_validator_1.check('id', 'No es un id valido').isNumeric(),
    express_validator_1.check('id').custom(db_validators_1.existeUsuario),
    validar_campos_1.default
], usuario_controller_1.deleteUsuario);
exports.default = router;
//# sourceMappingURL=usuario.route.js.map