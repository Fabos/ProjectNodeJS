"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Categoria = connection_1.default.define('Categorias', {
    categoria: {
        type: sequelize_1.DataTypes.STRING
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
});
// Usuario.prototype.toJSON = function () {
//     let values = Object.assign({}, this.get());
//     delete values.password;
//     return values;
// }
exports.default = Categoria;
//# sourceMappingURL=categoria.js.map