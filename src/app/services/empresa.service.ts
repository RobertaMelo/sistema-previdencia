import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';

@Injectable()
export class EmpresaService {

  constructor(
    public http: HttpClient
  ) {}
 
  buscaEmpresas(): Observable<any> {
    return this.http.get<any>(`${API_CONFIG.baseUrl}empresa/records`);
  }
  
}