export interface SaldoDTO {
    id: number;
    saldoContribuicoesNormais: number;
    saldoContribuicoesAdicionais: number;
    quantidadeParcelas: number;
    saldoTotal: number;
    saldoDisponivelRetirada: number;    
}

export interface ContribuicoesDTO {
    id: number;
    data: string;
    tipo: string;
    valor: number;
    idParticipanteFk: number;
    idSaldoFK: number;
}

export interface ResgateDTO {
    id: number;
    tipoResgate: string;
    tipoSaldoResgate: string;
    dataUltimoResgate: Date;
    opcaoPagamentoParcelado: string;
    quantidadeParcelaResgate: number;
    valorParcelaResgate: number;
    valorResgateParcial: number;
    dataLiberacaoResgate: Date;
    idParticipanteFk: number;
    formulario: Blob;
}