import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaReceitasComponent } from './lista-receitas.component';
import { ListaReceitasRoutingModule } from './lista-receitas-routing.module';


@NgModule({
  declarations: [
    ListaReceitasComponent
  ],
  imports: [
    CommonModule,
    ListaReceitasRoutingModule
  ]
})
export class ListaReceitasModule { }
