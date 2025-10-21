import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NovaReceitaRoutingModule } from './nova-receita-routing.module';
import { NovaReceitaComponent } from './nova-receita.component';

@NgModule({
  declarations: [NovaReceitaComponent],
  imports: [CommonModule, NovaReceitaRoutingModule],
})
export class NovaReceitaModule {}
