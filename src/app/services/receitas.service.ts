import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Receita } from './../models/receitas';

@Injectable({
  providedIn: 'root',
})
export class ReceitasService {
  http = inject(HttpClient);

  API = 'http://localhost:8080/receitas';

  constructor() {}

  listarReceitas(): Observable<number> {
    return this.http.get<number>(`${this.API}/soma-recebido`);
  }

  salvarReceita(receita: Receita): Observable<any> {
    return this.http.post(this.API, receita);
  }

  atualizarReceita(id: number, receita: any): Observable<any> {
    return this.http.put(`${this.API}/${id}`, receita);
  }

  deletarReceita(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
