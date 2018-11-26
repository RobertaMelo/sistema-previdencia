import { Injectable } from '@angular/core';


@Injectable()

export class DateService {

  constructor( ) {}
 
  adicionaDias(data, quantidadeDias) {
    data.setDate(data.getDate() + quantidadeDias);
    return data;
  }

  adicionaMeses(data, quantidadeMeses) {
    data.setMonth(data.getMonth() + quantidadeMeses);
    return data;
  }

  adicionaAnos(data, quantidadeAnos) {
    data.setFullYear(data.getFullYear() + quantidadeAnos);
    return data;
  }
  
  isDataMaiorQueHoje(data) {
    return data > new Date();
  }

  formataData(data) {
    let day = data.getDate();
    let month = data.getMonth();
    let year = data.getFullYear();
    return day + '/' + month + '/' + year;
  }
}