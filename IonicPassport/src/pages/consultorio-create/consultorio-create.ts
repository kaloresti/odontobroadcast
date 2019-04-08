import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';


/**
 * Generated class for the ConsultorioCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultorio-create',
  templateUrl: 'consultorio-create.html',
})
export class ConsultorioCreatePage {
  loading: boolean = false;
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController,
    private authService: AuthProvider,
    private userService: UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsultorioCreatePage');
  }

}
