import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { QRCodeGeneratorRoutingModule } from './qrcode-generator-routing.module';
import { QRCodeGeneratorComponent } from './qrcode-generator/qrcode-generator.component';


@NgModule({
  declarations: [
    QRCodeGeneratorComponent
  ],
  imports: [
    CommonModule,
    QRCodeGeneratorRoutingModule
  ]
})
export class QRCodeGeneratorModule { }
