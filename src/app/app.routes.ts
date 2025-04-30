import { Routes } from '@angular/router';
import { DasbhoardComponent } from './features/pages/dashboard/dasbhoard.component';
import { MainLayoutComponent } from './features/pages/main-layout/main-layout.component';
import { HomeReceitasComponent } from './features/pages/receitas/home-receitas/home-receitas.component';
import { ReceitasListaComponent } from './features/pages/receitas/lista-receitas/receitas-lista.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DasbhoardComponent },
      { path: 'receitas', component: HomeReceitasComponent },
      { path: 'lista-receitas', component: ReceitasListaComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];
