import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';


import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';
/**
 * Generated class for the AgendaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agenda',
  templateUrl: 'agenda.html',
})
export class AgendaPage {

  loading: boolean = false;
  user: any;
  agendamentos: any;
  formRegister: any = {
    paciente_id: '',
    dt_inicio: '',
    dt_fim: '',
    consultorio_id: '',
  };
  consultorios: any;
  pacientes: any;

  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    private authService: AuthProvider,
    private userService: UserProvider
  ) {
    
  }

  async ionViewCanEnter () {
    let isAuthenticated = await this.authService.checkIsAuthenticated();
    return isAuthenticated;
  }

  ionViewDidLoad() {
    this.getUser();
    this.getPacientes();
    this.getConsultorios();
    
  }

  getUser () 
  {
    this.loading = true;
    this.userService.getUserInfo()
      .then((response: any) => {
        this.loading = false;
        this.user = response;
      })
      .catch(err => {
        this.loading = false;
        let alert = this.alertCtrl.create({ title: 'Error', message: 'Error on get user info', buttons: ['Ok'] });
        alert.present();
      })
  }

  getPacientes () 
  {
    this.loading = true;
    this.userService.getPacientes()
      .then((response: any) => {
        this.loading = false;
        this.pacientes = response.data;
        console.log(this.pacientes);
      })
      .catch(err => {
        this.loading = false;
        let alert = this.alertCtrl.create({ title: 'Error', message: 'Error on get user info', buttons: ['Ok'] });
        alert.present();
      })
  }

  getConsultorios () 
  {
    this.loading = true;
    this.userService.getConsultorios()
      .then((response: any) => {
        this.loading = false;
        this.consultorios = response.data;
        console.log(this.consultorios);
      })
      .catch(err => {
        this.loading = false;
        let alert = this.alertCtrl.create({ title: 'Error', message: 'Error on get user info', buttons: ['Ok'] });
        alert.present();
      })
  }

  agendar()
  {
    //this.loading.present();
    this.userService.agendar(this.formRegister)
      .then((response: any) => {
        let alert = this.alertCtrl.create({ title: 'Success', message: response.message, buttons: ['Ok'] });
        this.navCtrl.pop();
        console.log(response)
      })
      .catch((err: any) => {
        console.log(err);
      })
  }

 
}
