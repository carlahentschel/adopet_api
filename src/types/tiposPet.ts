import PetEntity from "../entities/PetEntity";

type TipoRequestBodyPet = Omit<PetEntity, "id">; //para omitir o id ao criar o pet

type TipoRequestParamsPet = { id?: string, pet_id?: string, adotante_id?: string }; //para receber os id's como parâmetros

type TipoResponseBodyPet = {
    data?: Pick<PetEntity, "id"|"nome"|"especie"|"porte"> | Pick<PetEntity, "id"|"nome"|"especie"|"porte">[]; //para selecionar os campos que queremos de resposta 
    error?: unknown;
}; 

export {
    TipoRequestBodyPet, 
    TipoResponseBodyPet, 
    TipoRequestParamsPet
};