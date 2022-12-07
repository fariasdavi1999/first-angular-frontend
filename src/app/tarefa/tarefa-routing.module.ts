import { TarefaComponent } from './tarefa/tarefa.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TarefaListaComponent } from './tarefa-lista/tarefa-lista.component';


const routes: Routes = [

  {
    path: '', component: TarefaListaComponent
  },

  {
    path: 'nova-tarefa', component: TarefaComponent
  },

  {
    path: ':id', component: TarefaComponent
  },

  {
    path: ':feito', component: TarefaListaComponent
  }

]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TarefaRoutingModule { }
