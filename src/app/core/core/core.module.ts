import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

import { ClienteService } from './../../cliente/cliente.service';
import { MenuComponent } from './../../components/menu/menu.component';



@NgModule({

  declarations: [
    MenuComponent
  ],

  imports: [
    CommonModule,

    AccordionModule,
    MenubarModule,
    HttpClientModule
  ],

  exports: [
    MenuComponent
  ],

  providers: [
    ClienteService,
    MessageService,
    ConfirmationService
  ]

})

export class CoreModule { }
