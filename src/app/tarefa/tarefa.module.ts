import { TarefaRoutingModule } from './tarefa-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TarefaListaComponent } from './tarefa-lista/tarefa-lista.component';
import { TarefaComponent } from './tarefa/tarefa.component';




@NgModule({
  declarations: [
    TarefaListaComponent,
    TarefaComponent
  ],
  imports: [
    CommonModule,
    TarefaRoutingModule
  ]
})
export class TarefaModule { }
