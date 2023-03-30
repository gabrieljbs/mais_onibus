import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesPage } from './pages.page';

const routes: Routes = [
  {
    path: '',
    component: PagesPage
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'rotas',
    loadChildren: () => import('./rotas/rotas.module').then( m => m.RotasPageModule)
  },

  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },

  {
    path: 'viagens',
    loadChildren: () => import('./viagens/viagens.module').then( m => m.ViagensPageModule)
  },
  {
    path: 'confirmacao',
    loadChildren: () => import('./confirmacao/confirmacao.module').then( m => m.ConfirmacaoPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./search/search.module').then( m => m.DetailsPageModule)
  },





];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesPageRoutingModule {}
