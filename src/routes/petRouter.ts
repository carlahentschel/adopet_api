import express, { RequestHandler } from "express";
import PetController from "../controller/PetController";
import PetRepository from "../repositories/PetRepository";
import { AppDataSource } from "../config/dataSource";
import { Request, ParamsDictionary, Response, NextFunction } from "express-serve-static-core";
import { ParsedQs } from "qs";

const router = express.Router();
const petRepository = new PetRepository(
    AppDataSource.getRepository("PetEntity"),
    AppDataSource.getRepository("AdotanteEntity")
);
const petController = new PetController(petRepository);

const validateBodyPet: RequestHandler = (req, res, next) => 
  middlewareValidadorBodyPet(req, res, next);

//router.post("/", (req, res)=>petController.criaPet(req, res));
router.post("/", validateBodyPet, petController.criaPet);
router.get("/", (req, res)=>petController.listaPets(req, res));
router.put("/", (req, res)=>petController.atualizaPet(req, res));
router.delete("/", (req, res)=>petController.deletaPet(req, res));
router.put("/:pet_id/:adotante_id", (req, res) =>
  petController.adotaPet(req, res)
);
router.get("/filtro", (req, res) =>
  petController.buscaPetPorCampoGenerico(req, res)
);

export default router;

function middlewareValidadorBodyPet(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>, next: NextFunction): void {
  throw new Error("Function not implemented.");
}
