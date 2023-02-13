import { RelatoriosModule } from './relatorios/relatorios.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClienteModule } from './cliente/cliente.module';
import { HomeModule } from './home/home.module';
import { TarefaModule } from './tarefa/tarefa.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'home',
    loadChildren: () => HomeModule,
  },

  {
    path: 'cliente',
    loadChildren: () => ClienteModule,
  },

  {
    path: 'tarefa',
    loadChildren: () => TarefaModule,
  },

  {
    path: 'dashboard',
    loadChildren: () => DashboardModule,
  },
  {
    path: 'relatorios',
    loadChildren: () => RelatoriosModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
