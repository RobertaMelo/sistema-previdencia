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
    carencia: Date;
    idEmpresaFK: number;
    idSaldoFK: number;
    sexo: string;
    estadoCivil: string,
    telefone: number,
    renda: number;
}

export interface EmpresaDTO {
    razaoSocial: string;
    cnpj: number;  
}