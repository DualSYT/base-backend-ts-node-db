require('dotenv').config();
import "reflect-metadata"
import { Logger } from "./lib/logger";
import {Server} from './models/Server'
try
{
    const server = new Server()
    server.listen();
}
catch(err:any){
}