export interface ParticipanteDTO {
    id: number;
    name : string;
    sobrenome: string;
    dataNascimento: Date;
    cpf: number;
    endereco: string;
    cidade: string;
    cep: number;
    estado: string;
    pais: string;
    dataAposentadoria: Date;
    saldoPortabilidade: number;
    planoPortabilidade: string;
    situacaoParticipante: string;
    valorParcelaContribuicao: number;
    dataCadastro: Date;
    carencia: number;
}

export interface EmpresaDTO {
    razaoSocial: string;
    cnpj: number;  
}