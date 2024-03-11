import PetEntity from "../entities/PetEntity";

type TipoRequestBodyPet = Omit<PetEntity, "id">; //para omitir o id ao criar o pet

type TipoRequestParamsPet = { id?: string, pet_id?: string, adotante_id?: string }; //para receber os id's como parâmetros

type TipoPet = Pick<PetEntity, "id"|"nome"|"especie"|"porte"> //para selecionar os campos que queremos de resposta 

type TipoResponseBodyPet = {
    data?: TipoPet | TipoPet[]; 
}; 

export {
    TipoRequestBodyPet, 
    TipoResponseBodyPet, 
    TipoRequestParamsPet
};