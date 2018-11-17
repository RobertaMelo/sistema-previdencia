export interface SaldoDTO {
    saldoContribuicoesNormais: number;
    saldoContribuicoesAdicionais: number;
    quantidadeParcelas: number;
    saldoAtual: number;
    saldoDisponivelRetirada: number;    
}

export interface ContribuicoesDTO {
    data: Date;
    tipo: string;
    valor: string;
}

export interface ResgateDTO {
    tipoResgate: string;
    tipoSaldoResgate: string;
}