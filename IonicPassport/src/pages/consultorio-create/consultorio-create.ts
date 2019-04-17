import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController, LoadingController, Nav } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';

import { ConsultorioPage } from '../../pages/consultorio/consultorio';
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
  @ViewChild(Nav) nav: Nav;
  loading: any;
  user: any;
  formRegister: any = {
    nome: '',
    cep: '',
    uf: '',
    cidade: '',
    beirro: '',
    logradouro: '',
    numero: '',
    complemento: '',
    user_id: 0
   
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController,
    private authService: AuthProvider,
    private userService: UserProvider,
    private loadingCtrl: LoadingController,) {

      //this.loading = this.loadingCtrl.create({content: 'Aguarde ...'});
      
  }

  async ionViewCanEnter () {
    let isAuthenticated = await this.authService.checkIsAuthenticated();
    return isAuthenticated;
  }

  ionViewDidLoad() {
    this.getUser();
   
  }

  cadastrarConsultorio() {
    console.log(this.user);
    this.formRegister.user_id = this.user.id;
    this.userService.registerConsultorio(this.formRegister)
      .then((response: any) => {
        console.log("CADASTRAR CONSULTORIO", response);
        this.navCtrl.setRoot(ConsultorioPage);
        //this.nav.setRoot(ConsultorioPage);
      })
      .catch((err: any) => {
        //this.loading.dismiss();
        let alert = this.alertCtrl.create({ title: 'Error', buttons: ['Ok']});
        alert.present();
      })
  }

  getUser () 
  {
    this.loading = true;
    this.userService.getUserInfo()
      .then((response: any) => {
        this.loading = false;
        this.user = response;
        console.log("USER", this.user);
        return response.id;
        //return this.user;
      })
      .catch(err => {
        this.loading = false;
        let alert = this.alertCtrl.create({ title: 'Error', message: 'Error on get user info', buttons: ['Ok'] });
        alert.present();
      })
  }

  
  
}
