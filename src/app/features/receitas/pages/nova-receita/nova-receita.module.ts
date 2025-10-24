import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NovaReceitaRoutingModule } from './nova-receita-routing.module';
import { NovaReceitaComponent } from './nova-receita.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms'; 
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [NovaReceitaComponent],
  imports: [CommonModule, NovaReceitaRoutingModule, MatIconModule, MatButtonModule, MatNativeDateModule, MatSlideToggleModule, FormsModule, MatDatepickerModule , MatInputModule],
})
export class NovaReceitaModule {}
