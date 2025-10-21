// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainLayoutComponent } from './app/features/pages/main-layout/main-layout.component';


const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'receitas/lista', loadChildren: () => import('./app/features/receitas/pages/lista-receitas/lista-receitas.module').then(m => m.ListaReceitasModule) },
    { path: 'receitas/nova', loadChildren: () => import('./app/features/receitas/pages/nova-receita/nova-receita.module').then(m => m.NovaReceitaModule) },
    { path: 'dashboard', loadChildren: () => import('./app/features/dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: '**', redirectTo: '' },
      ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
