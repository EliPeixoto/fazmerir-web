import { Routes } from '@angular/router';
import { DasbhoardComponent } from './features/pages/dasbhoard/dasbhoard.component';
import { HomeReceitasComponent } from './features/pages/receitas/home-receitas/home-receitas.component';
import { ReceitasListaComponent } from './features/pages/receitas/lista-receitas/receitas-lista.component';
import { LoginComponent } from './shared/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redireciona '' para login
  { path: 'login', component: LoginComponent },
  { path: '', component: DasbhoardComponent },
  { path: 'receitas', component: HomeReceitasComponent },
  { path: 'lista-receitas', component: ReceitasListaComponent },
  { path: '**', redirectTo: '' },
];
