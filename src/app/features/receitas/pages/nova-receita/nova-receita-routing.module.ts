import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceitasComponent } from '../../receitas.component';
import { NovaReceitaComponent } from './nova-receita.component';

const routes: Routes = [{ path: '', component: NovaReceitaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NovaReceitaRoutingModule { }
