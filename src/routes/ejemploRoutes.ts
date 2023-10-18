import { Router,Response,Request } from "express";
import { validarCampos } from "../middlewares/validarCampos";
import { Logger } from "../lib/logger";
import { body, check, param, query } from "express-validator";
import { dbEjemplo } from "../database/ejemploLogicaDB";

class ControladorEjemplo {
  router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }

  public async ejemploAccion(req: Request, res: Response): Promise<void> {
    let solicitud = req.body;
    let respuesta = await dbEjemplo();
    if (respuesta =! "OK") {
      res.status(400).json({
        status: 400,
        info: "Ocurrio un erroro",
        error: respuesta
      });
    } else {
      res.status(200).json({
        status: 200,
        info: "OK",
      });
    }
  }

 

  routes() {

    this.router.post(
      "/ejemplo",
      this.ejemploAccion
    );

    this.router.get("/*", function (req, res) {
      res.status(404).json({
        status: 404,
        info: "URL Desconocida",
        respuesta: "Dirección URL no válida",
      });
    });
  }
}
const CE = new ControladorEjemplo();
export default CE.router;
