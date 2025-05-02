import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReceitasService } from './../../../../services/receitas.service';

@Component({
  selector: 'app-edita-receitas',
  templateUrl: './edita-receitas.component.html',
})
export class EditaReceitasComponent implements OnInit {
  receitaForm!: FormGroup;
  isEditMode = false;
  receitaId?: number;

  receitasService = inject(ReceitasService);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.receitaForm = this.fb.group({
      valorReceita: ['', Validators.required],
      descricaoRecebimento: ['', Validators.required],
      categoriaReceita: [''],
      dataRecebimento: ['', Validators.required],
      statusReceita: ['PENDENTE'],
    });

    const receitaData = history.state.receita;
    if (receitaData) {
      this.isEditMode = true;
      this.receitaId = receitaData.id;
      this.receitaForm.patchValue(receitaData);
    }
  }

  salvar() {
    if (this.receitaForm.valid) {
      const formValue = {
        ...this.receitaForm.value,
        id: this.receitaId,
      };

      if (this.isEditMode && this.receitaId != null) {
        // 🔁 Chamada ao service para atualização
        this.receitasService
          .atualizarReceita(this.receitaId, formValue)
          .subscribe({
            next: () => {
              this.toastr.success('Receita atualizada com sucesso!');
              this.router.navigate(['/lista-receitas']);
            },
            error: () => {
              this.toastr.error('Erro ao atualizar receita.');
            },
          });
      } else {
        // Se estiver criando nova receita
        this.receitasService.salvarReceita(formValue).subscribe({
          next: () => {
            this.toastr.success('Receita cadastrada com sucesso!');
            this.router.navigate(['/lista-receitas']);
          },
          error: () => {
            this.toastr.error('Erro ao cadastrar receita.');
          },
        });
      }
    }
  }

  onToggleStatus(event: MatSlideToggleChange): void {
    if (this.isEditMode && this.receitaId) {
      // edição → atualiza no backend
      this.receitasService.alterarStatus(this.receitaId).subscribe({
        next: (res) => {
          this.receitaForm.patchValue({ statusReceita: res.statusReceita });
        },
        error: () => {
          this.toastr.error('Erro ao alterar o status.');
        },
      });
    } else {
      // cadastro → apenas altera localmente o valor no form
      const novoStatus = event.checked ? 'RECEBIDO' : 'PENDENTE';
      this.receitaForm.patchValue({ statusReceita: novoStatus });
    }
  }

  cancelar() {
    this.router.navigate(['/lista-receitas']);
  }
}
