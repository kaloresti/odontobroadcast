import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, MenuController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { decodeLaravelErrors } from '../../functions/Helpers';
import { HomePage } from '../home/home';
import { RecoverPage } from '../recover/recover';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {

  segment: string = "login";
  loading: any;
  formLogin: any = {
    email: '',
    password: '',
  };
  formRegister: any = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    cro: '',
    cro_uf: '',
    cpf: '',
    especialidade: '',
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private menuCtrl: MenuController,
    private authService: AuthProvider,
    public fb: Facebook
  ) {
    this.loading = this.loadingCtrl.create({content: 'Aguarde ...'});
  }

  ionViewDidLoad() {
    this.checkAuthenticated();
  }

  async checkAuthenticated () 
  {
    try {
      let isAuthenticated = await this.authService.checkIsAuthenticated();
      if ( isAuthenticated ) {
        this.menuCtrl.enable(true);
        this.navCtrl.setRoot(HomePage)
      }
    } catch (err) {
      console.log(err);
      let alert = this.alertCtrl.create({ title: 'Error', message: 'Error on verify authentication info', buttons: ['Ok'] });
      alert.present();
    }
  }

  doLogin (data: any) 
  {
    this.loading.present();
    this.authService.login(data)
      .then((response: any) => {
        this.loading.dismiss();
        this.authService.storeCredentials(response);
        setTimeout(() => {
          this.checkAuthenticated()
        }, 750);
      })
      .catch(err => {
        console.log(err);
        this.loading.dismiss();
        let alert = this.alertCtrl.create({ title: 'Error', buttons: ['Ok'] });
        if ( err.status == 400 ) {
          alert.setMessage(`${err.error.hint}`);
        } else if (err.status == 401) {
          alert.setMessage(`${err.error.message}`);
        } else {
          alert.setMessage('Unknow error on login');
        }
        alert.present();
      })
  }

  doRegister () 
  {
    this.loading.present();
    this.authService.register(this.formRegister)
      .then((response: any) => {
        this.loading.dismiss();
        console.log(response)
        this.doLogin({
          email: this.formRegister.email,
          password: this.formRegister.password,
        });
      })
      .catch((err: any) => {
        this.loading.dismiss();
        let alert = this.alertCtrl.create({ title: 'Error', buttons: ['Ok']});
        if (err.status == 422) {
          let decodedErrors: any = decodeLaravelErrors(err)
          alert.setMessage(decodedErrors.errors.join('<br>'));
        } else {
          let decodedErrors: any = decodeLaravelErrors(err)
          alert.setMessage(decodedErrors.errors.join('<br>'));
        }
        alert.present();
      })
  }

  validateLoginData (data: any) 
  {
    return true;
  }

  doLoginFacebook()
  {
    this.loading.present();
    console.log("chamei a função");
      // Login with permissions
      this.fb.login(['public_profile', 'user_photos', 'email', 'user_birthday'])
      .then( (res: FacebookLoginResponse) => {

          // The connection was successful
          if(res.status == "connected") {

              // Get user ID and Token
              var fb_id = res.authResponse.userID;
              var fb_token = res.authResponse.accessToken;

              // Get user infos from the API
              this.fb.api("/me?fields=name,gender,birthday,email", []).then((user) => {

                  // Get the connected user details
                  this.formRegister.name = user.name;
                  this.formRegister.email = user.email;
                  this.formRegister.password = user.email;
                  this.formRegister.password_confirmation = user.email;
                  this.formRegister.cro = 'N/A'
                  this.formRegister.cro_uf = 'N/A'
                  this.formRegister.cpf = 'N/A'
                  this.formRegister.especialidade = 'N/A'  
                 
                  this.formLogin.email = user.email;
                  this.formLogin.password = user.email;

                  this.authService.verifyExistUser(this.formRegister)
                    .then((response: any) => {
                      this.loading.dismiss();
                      console.log(response);
                      console.log(typeof(response.exist))
                      if(response.exist == true)
                      {
                        console.log("Tentando logar no sistema!!!!");
                        this.doLogin(this.formLogin);
                      } else{
                        console.log("Tentando cadastrar um novo usário!!!!");
                        this.doRegister();
                      }
                    })
                    .catch((err: any) => {
                      this.loading.dismiss();
                      let alert = this.alertCtrl.create({ title: 'Error', buttons: ['Ok']});
                      if (err.status == 422) {
                        let decodedErrors: any = decodeLaravelErrors(err)
                        alert.setMessage(decodedErrors.errors.join('<br>'));
                      } else {
                        let decodedErrors: any = decodeLaravelErrors(err)
                        alert.setMessage(decodedErrors.errors.join('<br>'));
                      }
                      alert.present();
                    })
                  // => Open user session and redirect to the next page

              });

          } 
          // An error occurred while loging-in
          else {

              console.log("An error occurred...");

          }

      })
      .catch((e) => {
          console.log('Error logging into Facebook', e);
      });
  }

  openRecoverPage(): void {
    this.navCtrl.push(RecoverPage);
  }
 

}
