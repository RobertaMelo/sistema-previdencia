import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { SaldoDTO } from '../model/saldo.dto';

@Injectable()
export class SaldoService {

  constructor(
    public http: HttpClient
  ) {}
  
  buscaPorId(id: number) : Observable<SaldoDTO> {
    return this.http.get<SaldoDTO>(`${API_CONFIG.baseUrl}saldo/${id}`);
  }

}