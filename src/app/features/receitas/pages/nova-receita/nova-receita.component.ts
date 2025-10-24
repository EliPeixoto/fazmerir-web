import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';


@Component({
  selector: 'app-nova-receita',
  templateUrl: './nova-receita.component.html',
  styleUrl: './nova-receita.component.scss'
})
export class NovaReceitaComponent {
 status = false;
 dataRecebimento: Date | null = null;
 valorReceita: number | null = null;
 descricao: string = '';
 categoria: string = '';

 categoriaControl = new FormControl('');
 categorias: string[] = ['Apartamento', 'Salário', 'Freelancer', 'Investimentos', 'Outros'];

  allowNewCategoria = true;

   constructor() {
  }

  private _filter(value: string): string[] {
    const filterValue = value?.toLowerCase() || '';
    return this.categorias.filter(option => option.toLowerCase().includes(filterValue));
  }

  onOptionSelected(event: any) {
    const selected = event.option.value;
    if (this.allowNewCategoria && !this.categorias.includes(selected)) {
      // adiciona nova categoria
      this.categorias.push(selected);
    }
  }
}
