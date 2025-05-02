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

  listarReceitas(): Observable<Receita[]> {
    return this.http.get<Receita[]>(this.API);
  }

  salvarReceita(receita: Receita): Observable<any> {
    return this.http.post(this.API, receita);
  }

  atualizarReceita(id: number, receita: any): Observable<any> {
    return this.http.put(`${this.API}/${id}`, receita);
  }

  alterarStatus(id: number): Observable<any> {
    return this.http.put<any>(`${this.API}/altera-status/${id}`, {});
  }

  deletarReceita(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }

}
