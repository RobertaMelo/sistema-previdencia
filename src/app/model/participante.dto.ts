export interface ParticipanteDTO {
    id: number;
    nome : string;
    sobrenome: string;
    dataNascimento: Date;
    cpf: number;
    endereco: string;
    cidade: string;
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
    dataProximoResgateNormal: Date;
}

export interface EmpresaDTO {
    id: number;
    razaoSocial: string;
    cnpj: number;  
}