import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';


import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';

import { AuxiliaresCreatePage } from '../../pages/auxiliares-create/auxiliares-create';

/**
 * Generated class for the AuxiliaresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-auxiliares',
  templateUrl: 'auxiliares.html',
})
export class AuxiliaresPage {

  loading: boolean = false;
  user: any;
  auxiliares: any;

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
  }

  getUser () 
  {
    this.loading = true;
    this.userService.getUserInfo()
      .then((response: any) => {
        this.loading = false;
        this.user = response;
        this.getAuxiliares(this.user.id);
      })
      .catch(err => {
        this.loading = false;
        let alert = this.alertCtrl.create({ title: 'Error', message: 'Error on get user info', buttons: ['Ok'] });
        alert.present();
      })
  }

  getAuxiliares(user_id)
  {
    this.userService.getAuxiliarPorDentista(user_id)
      .then((response: any) => {
        this.loading = false;
        this.auxiliares = response.data;
        console.log("AUXILIARES", response.data);
      })
      .catch(err => {
        this.loading = false;
        let alert = this.alertCtrl.create({ title: 'Error', message: 'Error on get user info', buttons: ['Ok'] });
        alert.present();
      })
  }

  openAuxiliaresCreate()
  {
    this.navCtrl.push(AuxiliaresCreatePage);
  }

}
