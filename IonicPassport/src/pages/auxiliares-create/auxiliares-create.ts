import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';


import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';

import { AuxiliaresPage } from '../../pages/auxiliares/auxiliares';

/**
 * Generated class for the AuxiliaresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-auxiliares-create',
  templateUrl: 'auxiliares-create.html',
})
export class AuxiliaresCreatePage {

  loading: boolean = false;
  user: any;
  consultorios: any;

  formRegister: any = {
    nome: '',
    rg: '',
    cpf: '',
    email: '',
    celular: '',
    dt_nascimento: '',
    user_id: 0,
    consultorio_id:  0
  };
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

  cadastrarAuxiliar()
  {
    console.log(this.user);
    this.formRegister.user_id = this.user.id;
    this.userService.registerAuxiliar(this.formRegister)
      .then((response: any) => {
        console.log("CADASTRAR AUXILIAR", response);
        this.navCtrl.setRoot(AuxiliaresPage);
        //this.nav.setRoot(ConsultorioPage);
      })
      .catch((err: any) => {
        //this.loading.dismiss();
        let alert = this.alertCtrl.create({ title: 'Error', buttons: ['Ok']});
        alert.present();
      })
  }

}
