import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Receita } from '../../../../models/receitas';
import { ReceitasService } from '../../../../services/receitas.service';

declare var bootstrap: any;

@Component({
  selector: 'app-receitas-lista',
  templateUrl: './receitas-lista.component.html',
  styleUrls: ['./receitas-lista.component.scss'],
})
export class ReceitasListaComponent {
  list: Receita[] = [];
  receitaSelecionada?: Receita;
  modalInstance?: any;

  // Injeções via `inject()` ou construtor tradicional
  receitasService = inject(ReceitasService);
  router = inject(Router);

  constructor(private toastr: ToastrService) {
    this.listarReceitas();
  }

  listarReceitas(): void {
    this.receitasService.listarReceitas().subscribe({
      next: (lista) => {
        this.list = lista;
      },
      error: () => {
        this.toastr.error('Erro ao carregar receitas.');
      },
    });
  }

  abrirModalExclusao(receita: Receita): void {
    this.receitaSelecionada = receita;

    const modalEl = document.getElementById('confirmarExclusaoModal');
    if (modalEl) {
      this.modalInstance = new bootstrap.Modal(modalEl);
      this.modalInstance.show();
    }
  }

  confirmarExclusao(): void {
    if (!this.receitaSelecionada) return;

    this.receitasService.deletarReceita(this.receitaSelecionada.id).subscribe({
      next: () => {
        this.toastr.success('Receita excluída com sucesso!');
        this.listarReceitas();
        this.modalInstance?.hide();
      },
      error: () => {
        this.toastr.error('Erro ao excluir receita.');
        this.modalInstance?.hide();
      },
    });
  }

  editarReceita(receita: Receita): void {
    this.router.navigate(['/receitas/editar', receita.id], { state: { receita } });
  }


}
