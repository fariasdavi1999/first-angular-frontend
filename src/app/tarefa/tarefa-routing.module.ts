import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TarefaListaComponent } from './tarefa-lista/tarefa-lista.component';
import { TarefaComponent } from './tarefa/tarefa.component';

const routes: Routes = [
  {
    path: '',
    component: TarefaListaComponent,
  },
  {
    path: 'nova-tarefa',
    component: TarefaComponent,
  },
  {
    path: 'feito/:feito',
    component: TarefaListaComponent,
  },
  {
    path: ':id',
    component: TarefaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TarefaRoutingModule {}
