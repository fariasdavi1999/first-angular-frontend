import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AccordionModule } from 'primeng/accordion';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuModule } from 'primeng/menu';
import { MenuComponent } from './components/menu/menu.component';
import { ButtonModule } from 'primeng/button';
import { ClienteComponent } from './cliente/cliente/cliente.component';
import { ClienteListaComponent } from './cliente/cliente-lista/cliente-lista.component';
import { TableTesteComponent } from './components/table-teste/table-teste.component';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ClienteComponent,
    ClienteListaComponent,
    TableTesteComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AccordionModule,
    MenuModule,
    ButtonModule,
    TableModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
