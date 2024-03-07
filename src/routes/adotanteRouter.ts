import express from "express";
import AdotanteController from "../controller/AdotanteController";
import AdotanteRepository from "../repositories/AdotanteRepository";
import { AppDataSource } from "../config/dataSource";

const router = express.Router();
const adotanteRepository = new AdotanteRepository(
  AppDataSource.getRepository("AdotanteEntity")
);
const adotanteController = new AdotanteController(adotanteRepository);

router.post("/", adotanteController.criaAdotante); // Rota para criar um adotante
router.get("/", adotanteController.listaAdotantes);
router.put("/:id", adotanteController.atualizaAdotante);
router.delete("/:id", adotanteController.deletaAdotante);
router.patch("/:id", adotanteController.atualizaEnderecoAdotante);

export default router;
