import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReceitasService } from '../../../../services/receitas.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-nova-receita',
  standalone: true,
  imports: [
    CommonModule,
     ReactiveFormsModule,
     MatFormFieldModule,
     MatInputModule,
     MatDatepickerModule,
     MatNativeDateModule,
     MatIconModule,
     MatButtonModule
    ],
  templateUrl: './nova-receita.component.html'
})
export class NovaReceitaComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private receitasService: ReceitasService,
    private router: Router
  ) {
    this.form = this.fb.group({
      valorReceita: [null, [Validators.required, Validators.min(0.01)]],
      dataRecebimento: [null, Validators.required],
      descricaoRecebimento: ['', [Validators.required, Validators.minLength(3)]],
      categoriaReceita: ['']
    });
  }

  salvar() {
    if (this.form.valid) {
      this.receitasService.salvarReceita(this.form.value).subscribe({
        next: () => {
          alert('Receita cadastrada com sucesso!');
          this.router.navigate(['/lista-receitas']);
        },
        error: () => alert('Erro ao salvar receita.')
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  cancelar() {
    this.router.navigate(['/lista-receitas']);
  }

}
