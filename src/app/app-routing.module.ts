import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClienteModule } from './cliente/cliente.module';
import { HomeModule } from './home/home.module';

const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'home' },

  { path: 'home', loadChildren: () => HomeModule },

  { path: 'cliente', loadChildren: () => ClienteModule }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
