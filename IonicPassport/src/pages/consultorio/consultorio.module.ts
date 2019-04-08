import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultorioPage } from './consultorio';

@NgModule({
  declarations: [
    ConsultorioPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultorioPage),
  ],
})
export class ConsultorioPageModule {}
