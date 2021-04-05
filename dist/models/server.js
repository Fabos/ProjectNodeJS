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
const express_1 = __importDefault(require("express"));
const usuario_route_1 = __importDefault(require("../routers/usuario.route"));
const auth_route_1 = __importDefault(require("../routers/auth.route"));
const categoria_route_1 = __importDefault(require("../routers/categoria.route"));
const publicacion_route_1 = __importDefault(require("../routers/publicacion.route"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../db/connection"));
class Server {
    constructor() {
        this.apiPaths = {
            usuarios: '/api/usuarios',
            auth: '/api/auth',
            categorias: '/api/categorias',
            publicaciones: '/api/publicaciones',
        };
        this.app = express_1.default();
        this.port = process.env.PORT || '8000';
        this.dbConnection();
        this.middlewares();
        //Definir mis rutas
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log("Db online");
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    middlewares() {
        // CORS
        this.app.use(cors_1.default());
        //Lectura Body
        this.app.use(express_1.default.json());
        //Carpeta Publica
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.usuarios, usuario_route_1.default);
        this.app.use(this.apiPaths.auth, auth_route_1.default);
        this.app.use(this.apiPaths.categorias, categoria_route_1.default);
        this.app.use(this.apiPaths.publicaciones, publicacion_route_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puertooo' + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map