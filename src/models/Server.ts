
import express from 'express'
import cors from 'cors'
import bodyParser from "body-parser";
import ControladorEjemplo from '../routes/ejemploRoutes'
import { ENV } from '../config/envConfig'
import { dbMongo } from '../lib/database';

class Server {
    private app: any
    private port: any
    private url: string
    constructor() {
        this.port = ENV.PORT || 8080;
        this.app = express();
        this.url = '/api/ejemplo'
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
    }

    routes() {
        this.app.use(this.url, ControladorEjemplo)
    }

    listen() {
        this.app.listen(this.port, async (error: any) => {
            if (error) {
                process.exit(1)
            }
            else {
                try {
                    await dbMongo();
                }
                catch (err: any) {
                }
            }
        });
    }
}
export { Server }