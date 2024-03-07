import { Request, Response } from "express";
import type TipoPet from "../types/TipoPet";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";
import EnumPorte from "../enum/EnumPorte";
import InterfacePetRepository from "../repositories/interfaces/InterfacePetRepository";

let listaDePets: Array<TipoPet> = [];

/* let id = 0;
function geraId() {
  id = id + 1;
  return id;
} */

export default class PetController{
    constructor(private repository: InterfacePetRepository) {}; //injeção de dependência
    async criaPet(req: Request, res: Response) {
        const {adotado, especie, porte, dataDeNascimento, nome} = <PetEntity>req.body;
        
        if(!Object.values(EnumEspecie).includes(especie)) {
            return res.status(400).json({erro: "Espécie inválida"});
        }

        if(porte && !(porte in EnumPorte)) {
            return res.status(400).json({erro: "Porte inválido"});
        }
        const novoPet = new PetEntity(
            nome, 
            especie, 
            dataDeNascimento, 
            adotado, 
            porte
        );
        
        await this.repository.criaPet(novoPet);
        return res.status(201).json(novoPet);
    }

    async listaPets(req: Request, res: Response) {
        const listaDePets = await this.repository.listaPet();
        return res.status(200).json(listaDePets);
    }

    async atualizaPet(req: Request, res: Response) {
        const {id} = req.params;
        const { success, message } = await this.repository.atualizaPet(
            Number(id),
            req.body as PetEntity
        );
        const { adotado, especie, dataDeNascimento, nome } = req.body as TipoPet;
        const pet = listaDePets.find((pet) => pet.id === Number(id));
        if (!pet) {
            return res.status(404).json({erro: "Pet não encontrado"});
        }

        pet.nome = nome;
        pet.dataDeNascimento = dataDeNascimento;
        pet.especie = especie;
        pet.adotado = adotado;
        return res.status(200).json(pet);
    }

    deletaPet(req: Request, res: Response) {
        const {id} = req.params;
        const pet = listaDePets.find((pet) => pet.id === Number(id));
        if (!pet) {
            return res.status(404).json({erro: "Pet não encontrado"});
        }
        const index = listaDePets.indexOf(pet);
        listaDePets.splice(index, 1);
        return res.status(200).json({mensagem: "Pet deletado com sucesso"});
    }

    async adotaPet(req: Request, res: Response) {
        const { pet_id, adotante_id } = req.params;
        const { success, message } = await this.repository.adotaPet(
          Number(pet_id),
          Number(adotante_id)
        );
        if (!success) {
          return res.status(404).json({ message });
        }
        return res.sendStatus(204);
    }

    async buscaPetPorCampoGenerico(req: Request, res: Response) {
        const {campo, valor} = req.query;
        const listaDePets = await this.repository.buscaPetPorCampoGenerico(
            campo as keyof PetEntity,
            valor as string
        );
        if(!listaDePets) {
            return res.status(404).json({ mensagem: "Pet não encontrado."})
        }
        return res.status(200).json(listaDePets);
    }   

}