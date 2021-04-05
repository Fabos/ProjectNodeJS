import express, { Application } from "express";
import userRoutes from '../routers/usuario.route';
import authRoutes from '../routers/auth.route';
import categoriaRoutes from '../routers/categoria.route'
import publicacionRoutes from '../routers/publicacion.route'


import cors from 'cors'
import db from "../db/connection";

class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios',
        auth: '/api/auth',
        categorias: '/api/categorias',
        publicaciones: '/api/publicaciones',
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT|| '8000';
        this.dbConnection();
        this.middlewares();

        //Definir mis rutas
        this.routes();
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log("Db online");
            

        } catch (error) {
            throw new Error(error);
            

        }
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        //Lectura Body
        this.app.use(express.json());

        //Carpeta Publica
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.apiPaths.usuarios, userRoutes);
        this.app.use(this.apiPaths.auth, authRoutes);
        this.app.use(this.apiPaths.categorias, categoriaRoutes);
        this.app.use(this.apiPaths.publicaciones, publicacionRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puertooo' + this.port);

        });
    }
}

export default Server;