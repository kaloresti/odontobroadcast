import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PacienteCreatePage } from './paciente-create';

@NgModule({
  declarations: [
    PacienteCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(PacienteCreatePage),
  ],
})
export class PacienteCreatePageModule {}
