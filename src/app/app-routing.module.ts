import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClienteModule } from './cliente/cliente.module';
import { HomeModule } from './home/home.module';
import { TarefaModule } from './tarefa/tarefa.module';
import { authGuard } from './guards/auth.guard';
import { LoginModule } from './guards/login/login.module';
import { CadastroModule } from './cadastro/cadastro.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'login',
    loadChildren: () => LoginModule,
  },

  {
    path: 'cadastro',
    loadChildren: () => CadastroModule,
  },

  {
    path: 'home',
    loadChildren: () => HomeModule,
  },

  {
    path: 'cliente',
    loadChildren: () => ClienteModule,
    canActivate: [authGuard],
  },

  {
    path: 'tarefa',
    loadChildren: () => TarefaModule,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
