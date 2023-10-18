import moment from "moment-timezone";
import ejemplo from "../entity/ejemploEntity";
import { Logger } from "../lib/logger";

const dbEjemplo = async () => {
  return ejemplo.insertMany("")
    .then(() => {
      return "OK";
    })
    .catch((err) => {
      {
        return err.toString();
      }
    });
};

export { dbEjemplo};
