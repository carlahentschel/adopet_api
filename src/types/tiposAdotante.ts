import AdotanteEntity from "../entities/AdotanteEntity";

type TipoRequestBodyAdotante = Omit<AdotanteEntity, "id">; //para omitir o id ao criar o adotante

type TipoRequestParamsAdotante = { id: string }; //para receber o id como parâmetro

type TipoResponseBodyAdotante = {
    data?: Pick<AdotanteEntity, "id"|"nome"|"celular"> | Pick<AdotanteEntity, "id"|"nome"|"celular">[]; //para selecionar os campos que queremos de resposta 
    error?: unknown;
}; 

export {
    TipoRequestBodyAdotante, 
    TipoResponseBodyAdotante, 
    TipoRequestParamsAdotante
};
