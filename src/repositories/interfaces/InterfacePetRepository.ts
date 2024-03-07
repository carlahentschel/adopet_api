import PetEntity from "../../entities/PetEntity";

export default interface InterfacePetRepository {
    criaPet(pet:PetEntity): Promise<void>;
    listaPet(): Promise<PetEntity[]>;
    atualizaPet(id: number, pet: PetEntity): Promise<{ success: boolean; message?: string }>;
    deletaPet(id: number): Promise<{ success: boolean; message?: string }>;
    adotaPet(idPet: number, idAdotante: number): Promise<{ success: boolean; message?: string }>;
    buscaPetPorCampoGenerico<Tipo extends keyof PetEntity>(
        campo: Tipo, 
        valor: PetEntity[Tipo]
    ): Promise<PetEntity[]>;
}