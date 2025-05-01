import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Receita } from '../../../../models/receitas';
import { ReceitasService } from '../../../../services/receitas.service';

@Component({
  selector: 'app-receitas-lista',
  templateUrl: './receitas-lista.component.html',
  styleUrls: ['./receitas-lista.component.scss']
})
export class ReceitasListaComponent {
  list: Receita[] = [];
  receitasService = inject(ReceitasService);
  router = inject(Router);

  constructor() {
    this.listarReceitas();
  }

  listarReceitas() {
    this.receitasService.listarReceitas().subscribe({
      next: (lista) => {
        this.list = lista;
      },
      error: (erro) => {
        alert('Ocorreu algum erro');
      },
    });
  }

  excluirReceita(receita: any) {
    // lógica para excluir
    console.log('Excluir', receita);
  }

  editarReceita(receita: any) {
    this.router.navigate(['/receitas/editar'], { state: { receita } });
  }
}
