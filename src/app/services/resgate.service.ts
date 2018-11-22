import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { ResgateDTO } from '../model/saldo.dto';


@Injectable()
export class ResgateService {
    

  constructor(
    public http: HttpClient
  ) {}
 
  salva(resgate: ResgateDTO) {
    return this.http.post(
        `${API_CONFIG.baseUrl}resgate`, 
        resgate,
        { 
          observe: 'response', 
          responseType: 'text'
        }
    ); 
  }
}