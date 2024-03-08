import { DataSource } from "typeorm";
import PetEntity from "../entities/PetEntity";
import EnderecoEntity from "../entities/EnderecoEntity";
import AbrigoEntity from "../entities/AbrigoEntity";
import AdotanteEntity from "../entities/AdotanteEntity";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./src/config/database.sqlite",
    entities: [PetEntity, EnderecoEntity, AbrigoEntity, AdotanteEntity],
    synchronize: true,

})