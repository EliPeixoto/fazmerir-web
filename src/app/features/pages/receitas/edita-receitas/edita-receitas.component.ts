import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

    // Pegando ID da rota
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.receitaId = +idParam;
        this.isEditMode = true;

        this.receitasService.buscarReceitaPorId(this.receitaId).subscribe({
          next: (receita) => {
            console.log('Receita carregada:', receita);
            this.receitaForm.patchValue(receita);
          },
          error: () => {
            this.toastr.error('Erro ao carregar receita.');
          }
        });
      }
    });
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

  onCustomToggle(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    const status = checked ? 'RECEBIDO' : 'PENDENTE';

    if (this.isEditMode && this.receitaId) {
      this.receitasService.alterarStatus(this.receitaId).subscribe({
        next: (res) => {
          this.receitaForm.patchValue({ statusReceita: res.statusReceita });
        },
        error: () => {
          this.toastr.error('Erro ao alterar o status.');
        },
      });
    } else {
      this.receitaForm.patchValue({ statusReceita: status });
    }
  }

  cancelar() {
    this.router.navigate(['/lista-receitas']);
  }
}
