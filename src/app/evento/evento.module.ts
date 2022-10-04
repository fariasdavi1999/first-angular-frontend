import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';

import { EventoListaComponent } from './evento-lista/evento-lista.component';
import { EventoRoutingModule } from './evento-routing.module';
import { EventoComponent } from './evento/evento.component';



@NgModule({
  declarations: [
    EventoComponent,
    EventoListaComponent

  ],
  imports: [
    CommonModule,
    EventoRoutingModule,
    ButtonModule,
    InputTextModule,
    ToolbarModule,
    SplitButtonModule,
    DropdownModule
  ]
})
export class EventoModule { }
