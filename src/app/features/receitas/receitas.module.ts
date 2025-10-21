import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceitasRoutingModule } from './receitas-routing.module';
import { ReceitasComponent } from './receitas.component';


@NgModule({
  declarations: [
    ReceitasComponent
  ],
  imports: [
    CommonModule,
    ReceitasRoutingModule
  ]
})
export class ReceitasModule { }
