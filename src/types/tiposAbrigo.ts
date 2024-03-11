import AbrigoEntity from "../entities/AbrigoEntity";


type TipoRequestBodyAbrigo = Omit<AbrigoEntity, "id" |  "pets">; //para omitir o id e pets ao criar o abrigo

type TipoRequestParamsAbrigo = { id?: string }; //para receber o id como parâmetro

type TipoResponseBodyAbrigo = {
    data?: Pick<AbrigoEntity, "id"|"nome"|"email"|"celular"|"endereco"> | Pick<AbrigoEntity, "id"|"nome"|"email"|"celular"|"endereco">[]; //para selecionar os campos que queremos de resposta
}; 

export {
    TipoRequestBodyAbrigo, 
    TipoResponseBodyAbrigo, 
    TipoRequestParamsAbrigo
};