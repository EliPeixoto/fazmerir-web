import { Component, inject } from '@angular/core';
import { Receita } from '../../../../models/receitas';
import { ReceitasService } from '../../../../services/receitas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-receitas-lista',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './receitas-lista.component.html',
  styleUrls: ['./receitas-lista.component.scss'],
})
export class ReceitasListaComponent {
  list: Receita[] = [];
  receitasService = inject(ReceitasService);

  constructor() {
    this.listarReceitas();
  }

  listarReceitas() {
    this.receitasService.listarReceitas().subscribe({
      next: lista => {
        this.list = lista;
      },
      error: erro => {
        alert("Ocorreu algum erro");
      }
    });
  }
}

