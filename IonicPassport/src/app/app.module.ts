import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { CalendarModule } from 'ionic3-calendar-en';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { RecoverPage } from '../pages/recover/recover';
import { AgendaPage } from '../pages/agenda/agenda';
import { PacientePage } from '../pages/paciente/paciente';
import { ConsultorioPage } from '../pages/consultorio/consultorio';
import { ConsultorioCreatePage } from '../pages/consultorio-create/consultorio-create';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    RecoverPage,
    AgendaPage,
    PacientePage,
    ConsultorioPage,
    ConsultorioCreatePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    CalendarModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    RecoverPage,
    AgendaPage,
    PacientePage,
    ConsultorioPage,
    ConsultorioCreatePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    UserProvider,
    Facebook
  ]
})
export class AppModule {}
