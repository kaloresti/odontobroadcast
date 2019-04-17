import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';


import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';

import { PacienteCreatePage } from '../../pages/paciente-create/paciente-create';

/**
 * Generated class for the PacientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-paciente',
  templateUrl: 'paciente.html',
})
export class PacientePage {
  
  loading: boolean = false;
  user: any;
  pacientes: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController,
    private authService: AuthProvider,
    private userService: UserProvider) {
  }

  async ionViewCanEnter () {
    let isAuthenticated = await this.authService.checkIsAuthenticated();
    return isAuthenticated;
  }

  ionViewDidLoad() {
    this.getUser();
    
    //this.getConsultorios();
    
  }

  getUser () 
  {
    this.loading = true;
    this.userService.getUserInfo()
      .then((response: any) => {
        this.loading = false;
        this.user = response;
        this.getPacientes(this.user.id);
      })
      .catch(err => {
        this.loading = false;
        let alert = this.alertCtrl.create({ title: 'Error', message: 'Error on get user info', buttons: ['Ok'] });
        alert.present();
      })
  }

  getPacientes(user_id)
  {
    this.loading = true;
    this.userService.getPacientesPorDentista(user_id)
      .then((response: any) => {
        this.loading = false;
        console.log("Pacientes", response.data);
        this.pacientes = response.data;
        
      })
      .catch(err => {
        this.loading = false;
        let alert = this.alertCtrl.create({ title: 'Error', message: 'Error on get pacientes info', buttons: ['Ok'] });
        alert.present();
      })
    
  }

  openNovoPaciente()
  {
    this.navCtrl.push(PacienteCreatePage);
  }
}
