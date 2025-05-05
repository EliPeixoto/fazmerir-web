import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface SaldoTotalResponse {
  totalReceitas: number;
  totalSaldoManual: number;
  saldoTotal: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getResumoFinanceiro(): Observable<any> {
    return this.http.get(`${this.apiUrl}/resumo`);
  }

  getSaldoTotal(): Observable<SaldoTotalResponse> {
    return this.http.get<SaldoTotalResponse>(`${this.apiUrl}/receitas/saldo-total`);
  }
}
