import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClienteListaComponent } from './cliente-lista/cliente-lista.component';
import { ClienteComponent } from './cliente/cliente.component';

const routes: Routes = [

  { path: '', component: ClienteListaComponent },

  { path: 'novo-cliente', component: ClienteComponent },

  { path: ':id', component: ClienteComponent }


]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
