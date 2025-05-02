import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { ReceitasService } from '../../../../services/receitas.service';

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
    MatButtonModule,
  ],
  templateUrl: './nova-receita.component.html',
})
export class NovaReceitaComponent  {


  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private receitasService: ReceitasService,
    private router: Router,
    private toastr: ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.form = this.fb.group({
      valorReceita: [null, [Validators.required, Validators.min(0.01)]],
      dataRecebimento: [null, Validators.required],
      descricaoRecebimento: [
        '',
        [Validators.required, Validators.minLength(3)],
      ],
      categoriaReceita: [''],
      statusReceita: ['PENDENTE'],
    });
  }

  onToggleStatus(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    const status = checked ? 'RECEBIDO' : 'PENDENTE';
    this.form.patchValue({ statusReceita: status });
  }


  salvar() {
    if (this.form.valid) {
      this.receitasService.salvarReceita(this.form.value).subscribe({
        next: () => {
          this.toastr.success('Receita cadastrada com sucesso!');
          this.router.navigate(['/lista-receitas']);
        },
        error: () => this.toastr.error('Erro ao salvar receita.'),
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  cancelar() {
    this.router.navigate(['/lista-receitas']);
  }
}
