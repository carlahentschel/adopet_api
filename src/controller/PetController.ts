import { Request, Response } from "express";
import PetEntity from "../entities/PetEntity";
import InterfacePetRepository from "../repositories/interfaces/InterfacePetRepository";
import { TipoRequestBodyPet, TipoRequestParamsPet, TipoResponseBodyPet } from "../types/tiposPet";

export default class PetController{
    constructor(private repository: InterfacePetRepository) {}; //injeção de dependência
    async criaPet(
        req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>, 
        res: Response<TipoResponseBodyPet>
    ) {
        const {adotado, especie, porte, dataDeNascimento, nome} = <PetEntity>(req.body);
        
        const novoPet = new PetEntity(
            nome, 
            especie, 
            dataDeNascimento, 
            adotado, 
            porte
        );
        
        await this.repository.criaPet(novoPet);
        return res.status(201).json({data: {id: novoPet.id, nome, especie, porte}});
    }

    async listaPets(
        req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>, 
        res: Response<TipoResponseBodyPet>
    ) {
        const listaDePets = await this.repository.listaPet();
        const data = listaDePets.map((pet) => {
            return {
              id: pet.id,
              nome: pet.nome,
              especie: pet.especie,
              porte: pet.porte !==null ? pet.porte : undefined
            }
          })
        return res.status(200).json({data});
    }

    async atualizaPet(
        req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>, 
        res: Response<TipoResponseBodyPet>
    ) {
        const {id} = req.params;
        await this.repository.atualizaPet(
            Number(id),
            req.body as PetEntity
        );
        
        return res.sendStatus(204);
    }

    async deletaPet(
        req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>, 
        res: Response<TipoResponseBodyPet>
    ) {
        const {id} = req.params;
        await this.repository.deletaPet(Number(id));
        
        return res.sendStatus(204);
   
    }

    async adotaPet(
        req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>, 
        res: Response<TipoResponseBodyPet>
    ) {
        const { pet_id, adotante_id } = req.params;
        await this.repository.adotaPet(
          Number(pet_id),
          Number(adotante_id)
        );
        
        return res.sendStatus(204);
    }

    async buscaPetPorCampoGenerico(req: Request, res: Response) {
        const {campo, valor} = req.query;
        const listaDePets = await this.repository.buscaPetPorCampoGenerico(
            campo as keyof PetEntity,
            valor as string
        );
        return res.status(200).json(listaDePets);
    }   

}