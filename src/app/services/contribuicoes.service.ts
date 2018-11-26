import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { ContribuicoesDTO } from '../model/saldo.dto';

@Injectable()
export class ContribuicoesService {
  
  constructor(
    public http: HttpClient
  ) {}
 
  buscaTodos(): Observable<any> {
    return this.http.get<any>(`${API_CONFIG.baseUrl}contribuicoes`);
  }
  
  salva(contribuicoes: ContribuicoesDTO) {
    return this.http.post<ContribuicoesDTO>(
        `${API_CONFIG.baseUrl}contribuicoes`, 
        contribuicoes
    ); 
  }

  buscaDescricaoTipoContribuicao(contribuicao: ContribuicoesDTO) {
    switch (contribuicao.tipo) {
      case "0": 
        return "Contribuição Normal";
      case "1": 
       return "Contribuição Adicional";
    }
    
  }
}