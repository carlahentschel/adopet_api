import EnumEspecie from "../enum/EnumEspecie";

type tipoPet = {
    id: number,
    nome: string,
    especie: EnumEspecie;
    adotado: boolean,
    dataDeNascimento: Date;
}

export default tipoPet;