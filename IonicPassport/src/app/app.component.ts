import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AgendaPage } from '../pages/agenda/agenda';
import { PacientePage } from '../pages/paciente/paciente';
import { ConsultorioPage } from '../pages/consultorio/consultorio';
import { ConsultorioCreatePage } from '../pages/consultorio-create/consultorio-create';
import { AuxiliaresPage } from '../pages/auxiliares/auxiliares';
import { AuthProvider } from '../providers/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'AuthPage';

  pages: Array<{title: string, component: any, icon:any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
      private menuCtrl: MenuController,
      private authService: AuthProvider
    ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Minha Agenda', component: HomePage , icon: 'calendar'},
      { title: 'Meus Pacientes', component: PacientePage, icon: 'contacts'},
      { title: 'Meus Consultórios', component: ConsultorioPage, icon: 'medkit'},
      { title: 'Meus Auxiliares', component: AuxiliaresPage, icon: 'person'}
      //{ title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.menuCtrl.enable(false);
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout () {
    this.authService.removeCredentials();
    setTimeout(() => {
      this.menuCtrl.enable(false);
      this.nav.setRoot(this.rootPage);
    }, 750)
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
