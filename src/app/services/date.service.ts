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
    data.setYear(data.getYear() + quantidadeAnos);
    return data;
  }
  
  formataData(date) {
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    return day + '/' + monthIndex + '/' + year;
  }
}