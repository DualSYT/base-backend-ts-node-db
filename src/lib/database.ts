import mongoose from "mongoose";
import { dbMongoOpt } from "../config/db";
import { Logger } from "./logger";

export const dbMongo = async () => {
  await mongoose
    .connect(dbMongoOpt.dbUrl || "mongodb://localhost:27017/controlador-movimientos", {})
    .then(() => {
      Logger.info(`Conectado Mongo Controlador Movimientos ✓`);
    })
    .catch((err) => {
      Logger.error('[DB Mongo Controlador Movimientos ]', err)
    });
};
