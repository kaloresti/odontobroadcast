import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultorioCreatePage } from './consultorio-create';

@NgModule({
  declarations: [
    ConsultorioCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultorioCreatePage),
  ],
})
export class ConsultorioCreatePageModule {}
