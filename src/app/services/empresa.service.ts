import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { EmpresaDTO } from '../model/participante.dto';

@Injectable()
export class EmpresaService {

  constructor(
    public http: HttpClient
  ) {}
 
  buscaEmpresas(): Observable<any> {
    return this.http.get<any>(`${API_CONFIG.baseUrl}empresa`);
  }

  buscaPorId(id: number) : Observable<EmpresaDTO> {
    return this.http.get<EmpresaDTO>(`${API_CONFIG.baseUrl}empresa/${id}`);
  }
  
}