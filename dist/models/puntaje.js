"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const usuario_1 = __importDefault(require("./usuario"));
const Puntaje = connection_1.default.define('Puntajes', {
    puntaje: {
        type: sequelize_1.DataTypes.DOUBLE,
    },
});
Puntaje.belongsTo(usuario_1.default);
exports.default = Puntaje;
//# sourceMappingURL=puntaje.js.map