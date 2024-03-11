import AdotanteEntity from "../entities/AdotanteEntity";

type TipoRequestBodyAdotante = Omit<AdotanteEntity, "id" | "pets">; //para omitir o id e pets ao criar o adotante

type TipoRequestParamsAdotante = { id?: string }; //para receber o id como parâmetro

type TipoResponseBodyAdotante = {
    data?: Pick<AdotanteEntity, "id"|"nome"|"celular"|"endereco"> | Pick<AdotanteEntity, "id"|"nome"|"celular"|"endereco">[]; //para selecionar os campos que queremos de resposta
}; 

export {
    TipoRequestBodyAdotante, 
    TipoResponseBodyAdotante, 
    TipoRequestParamsAdotante
};
