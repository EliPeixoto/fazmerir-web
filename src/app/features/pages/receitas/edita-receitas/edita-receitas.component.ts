import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.receitaForm = this.fb.group({
      valorReceita: ['', Validators.required],
      descricaoRecebimento: ['', Validators.required],
      categoriaReceita: [''],
      dataRecebimento: ['', Validators.required]
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
        id: this.receitaId
      };

      if (this.isEditMode && this.receitaId != null) {
        // 🔁 Chamada ao service para atualização
        this.receitasService
          .atualizarReceita(this.receitaId, formValue)
          .subscribe({
            next: () => {
              alert('Receita atualizada com sucesso!');
              this.router.navigate(['/lista-receitas']);
            },
            error: () => {
              alert('Erro ao atualizar receita.');
            },
          });
      } else {
        // Se estiver criando nova receita
        this.receitasService.salvarReceita(formValue).subscribe({
          next: () => {
            alert('Receita cadastrada com sucesso!');
            this.router.navigate(['/lista-receitas']);
          },
          error: () => {
            alert('Erro ao cadastrar receita.');
          },
        });
      }
    }
  }

  cancelar() {
    this.router.navigate(['/receitas']);
  }
}
