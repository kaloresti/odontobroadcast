import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';

import { ConsultorioCreatePage } from '../consultorio-create/consultorio-create';
/**
 * Generated class for the ConsultorioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultorio',
  templateUrl: 'consultorio.html',
})
export class ConsultorioPage {
  
  loading: boolean = false;
  user: any;
  consultorios: any;

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
    //this.getPacientesAgendados();
  }

  getUser () 
  {
    this.loading = true;
    this.userService.getUserInfo()
      .then((response: any) => {
        this.loading = false;
        this.user = response;
        this.getConsultorios(this.user.id);
      })
      .catch(err => {
        this.loading = false;
        let alert = this.alertCtrl.create({ title: 'Error', message: 'Error on get user info', buttons: ['Ok'] });
        alert.present();
      })
  }

  getConsultorios(idUser)
  {
    this.loading = true;
    this.userService.getConsultoriosPorDentista(idUser)
      .then((response: any) => {
        this.loading = false;
        this.consultorios = response.data;
      })
      .catch(err => {
        this.loading = false;
        let alert = this.alertCtrl.create({ title: 'Error', message: 'Error on get user info', buttons: ['Ok'] });
        alert.present();
      })
  }

  openNovoConsultorio()
  {
    this.navCtrl.push(ConsultorioCreatePage);
  }

}
