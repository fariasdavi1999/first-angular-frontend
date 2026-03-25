import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AccordionModule } from 'primeng/accordion';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { MenuComponent } from '../menu/menu.component';

@NgModule({
  declarations: [MenuComponent],

  imports: [CommonModule, AccordionModule, MenubarModule],

  exports: [MenuComponent],

  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    MessageService,
    ConfirmationService,
  ],
})
export class CoreModule {}
