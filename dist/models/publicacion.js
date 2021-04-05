"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const usuario_1 = __importDefault(require("../models/usuario"));
const categoria_1 = __importDefault(require("../models/categoria"));
const Publicacion = connection_1.default.define('Publicaciones', {
    publicacion: {
        type: sequelize_1.DataTypes.STRING
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN
    }
});
Publicacion.belongsTo(usuario_1.default);
Publicacion.belongsTo(categoria_1.default);
// Usuario.prototype.toJSON = function () {
//     let values = Object.assign({}, this.get());
//     delete values.password;
//     return values;
// }
exports.default = Publicacion;
//# sourceMappingURL=publicacion.js.map