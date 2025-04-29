import { Receita } from './../models/receitas';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceitasService {

  http = inject(HttpClient);

  API = "http://localhost:8080/receitas"

  constructor() { }

  listarReceitas(): Observable<Receita[]>{
    return this.http.get<Receita[]>(this.API);
  }
}
