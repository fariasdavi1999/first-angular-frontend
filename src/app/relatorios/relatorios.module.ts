import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';

import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { RelatoriosComponent } from './relatorios/relatorios.component';

@NgModule({
  declarations: [RelatoriosComponent],
  imports: [
    CommonModule,
    RelatoriosRoutingModule,
    FormsModule,
    CheckboxModule,
    ButtonModule,
    RadioButtonModule,
    ButtonModule,
    TableModule,
  ],
})
export class RelatoriosModule {}
