import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController, LoadingController, Nav } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';

import { PacientePage } from '../../pages/paciente/paciente';

/**
 * Generated class for the PacienteCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-paciente-create',
  templateUrl: 'paciente-create.html',
})
export class PacienteCreatePage {
  loading: any;
  user: any;
  planos: any;
  formRegister: any = {
    nome: '',
    dt_nascimento: '',
    rg:'',
    cpf: '',
    celular: '',
    cep: '',
    uf: '',
    cidade: '',
    beirro: '',
    logradouro: '',
    numero: '',
    complemento: '',
    user_id: 0,
    plano_id: 0,
    latitude: '0000000',
    longitude: '0000000'
   
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
    this.getPlanos();
   
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
  
  getPlanos()
  {
    this.loading = true;
    this.userService.getPlanos()
    .then((response: any) => {
      this.loading = false;
      console.log("PLANOS", response.data);
      this.planos = response.data;
      //this.nav.setRoot(ConsultorioPage);
    })
    .catch((err: any) => {
      this.loading = false;
      //this.loading.dismiss();
      let alert = this.alertCtrl.create({ title: 'Error', buttons: ['Ok']});
      alert.present();
    })
  }

  cadastrarPaciente()
  {
    this.loading = true;
    console.log(this.user);
    this.formRegister.user_id = this.user.id;
    this.userService.registerPaciente(this.formRegister)
      .then((response: any) => {
        this.loading = false;
        console.log("CADASTRAR PACIENTE", response);
        if(response.data == "")
        {
          let alert = this.alertCtrl.create({ title: 'Error', message: response.message , buttons: ['Ok']});
          alert.present();
        }else{
          let alert = this.alertCtrl.create({ title: 'Pacientes', message: 'Paciente cadastrado com sucesso!' , buttons: ['Ok']});
          alert.present();
          this.navCtrl.setRoot(PacientePage);
        }

      })
      .catch((err: any) => {
        this.loading = false;
        //this.loading.dismiss();
        let alert = this.alertCtrl.create({ title: 'Error', buttons: ['Ok']});
        alert.present();
      })
    //this.navCtrl.setRoot(PacientePage);
  }
}
