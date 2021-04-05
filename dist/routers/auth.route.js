"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_controller_1 = require("../controllers/auth.controller");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const router = express_1.Router();
router.post('/login', [
    express_validator_1.check('email', 'El email es obligatorio').isEmail(),
    express_validator_1.check('password', 'El password es obligatorio').not().isEmpty(),
    validar_campos_1.default
], auth_controller_1.login);
exports.default = router;
//# sourceMappingURL=auth.route.js.map