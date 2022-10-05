import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: '' },

  { path: 'cliente-listar', loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule) },

  { path: 'novo-cliente', loadChildren: () => import('./evento/evento.module').then(m => m.EventoModule) },

  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
