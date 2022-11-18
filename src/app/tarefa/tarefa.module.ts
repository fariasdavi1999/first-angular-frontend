import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';

import { TarefaListaComponent } from './tarefa-lista/tarefa-lista.component';
import { TarefaRoutingModule } from './tarefa-routing.module';
import { TarefaComponent } from './tarefa/tarefa.component';




@NgModule({
  declarations: [
    TarefaListaComponent,
    TarefaComponent
  ],
  imports: [
    CommonModule,
    TarefaRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ToolbarModule,
    SplitButtonModule,
    DropdownModule,
    FormsModule,
    MessagesModule,
    MessageModule,
    CalendarModule,
    ConfirmDialogModule,
    InputMaskModule,
    CheckboxModule
  ]
})
export class TarefaModule { }
