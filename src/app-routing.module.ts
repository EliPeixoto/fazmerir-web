// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DasbhoardComponent } from './app/features/pages/dashboard/dasbhoard.component';
import { MainLayoutComponent } from './app/features/pages/main-layout/main-layout.component';
import { HomeReceitasComponent } from './app/features/pages/receitas/home-receitas/home-receitas.component';
import { ReceitasListaComponent } from './app/features/pages/receitas/lista-receitas/receitas-lista.component';
import { NovaReceitaComponent } from './app/features/pages/receitas/nova-receita/nova-receita.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DasbhoardComponent },
      { path: 'receitas', component: HomeReceitasComponent },
      { path: 'nova-receita', component: NovaReceitaComponent },
      { path: 'lista-receitas', component: ReceitasListaComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
