import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PacientePage } from './paciente';

@NgModule({
  declarations: [
    PacientePage,
  ],
  imports: [
    IonicPageModule.forChild(PacientePage),
  ],
})
export class PacientePageModule {}
