export interface SaldoDTO {
    id: number;
    saldoContribuicoesNormais: number;
    saldoContribuicoesAdicionais: number;
    quantidadeParcelas: number;
    saldoTotal: number;  
}

export interface ContribuicoesDTO {
    id: number;
    data: Date;
    tipo: string;
    valor: number;
    idParticipanteFk: number;
    idSaldoFK: number;
}

export interface ResgateDTO {
    id: number;
    tipoResgate: string;
    tipoSaldoResgate: string;
    dataResgate: Date;
    opcaoPagamentoParcelado: string;
    quantidadeParcelaResgate: number;
    valorParcelaResgate: number;
    valorResgateParcial: number;
    dataLiberacaoResgate: string;
    idParticipanteFk: number;
    formulario: Blob;
}