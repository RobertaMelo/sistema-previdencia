import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { ParticipanteDTO } from '../model/participante.dto';

@Injectable()
export class ParticipanteService {

  constructor(
    public http: HttpClient
  ) {}
 
  buscaTodos(): Observable<any> {
    return this.http.get<any>(`${API_CONFIG.baseUrl}participante`);
  }

  buscaPorId(id: number) : Observable<ParticipanteDTO> {
    return this.http.get<ParticipanteDTO>(`${API_CONFIG.baseUrl}participante/${id}`);
  }
  
  salva(participante: ParticipanteDTO) {
    return this.http.post(
        `${API_CONFIG.baseUrl}participante`, 
        participante
    ); 
  }

  altera(participante: ParticipanteDTO) {
    return this.http.put(
      `${API_CONFIG.baseUrl}participante/${participante.id}`, 
      participante
    ); 
  }

  buscaDescricaoSituacao(participante: ParticipanteDTO) {
    switch (participante.situacaoParticipante) {
      case "0": 
        return "Ativo";
      case "1": 
       return "Cancelado";
      case "2": 
       return "Benefício";
      case "3": 
       return "Vinculado";
      case "4": 
      return "Suspenso";
    }
    
  }
}