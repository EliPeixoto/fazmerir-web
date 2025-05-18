import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SaldoTotalResponse } from '../models/saldo-total-response';
import { Receita } from './../models/receitas';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getResumoFinanceiro(): Observable<SaldoTotalResponse> {
    return this.http.get<SaldoTotalResponse>(`${this.apiUrl}/saldo`);
  }

  listarReceitas(): Observable<number> {
  return this.http.get<number>(`${this.apiUrl}/soma-recebido`);
}

}
