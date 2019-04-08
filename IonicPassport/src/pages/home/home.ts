import { Component } from '@angular/core';
import { NavController, AlertController, Alert } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';

import { AgendaPage } from '../agenda/agenda';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loading: boolean = false;
  user: any = this.getUser();
  agendamentos: any;
  ano: any = new Date().getFullYear();
  mes: any = new Date().getMonth();
  dia: any = new Date().getDate();
  data: any;

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
    this.data = this.ano+'-'+(this.mes+1)+'-'+this.dia;
    this.getPacientesAgendados(this.data);
  }

  getUser () 
  {
    this.loading = true;
    this.userService.getUserInfo()
      .then((response: any) => {
        this.loading = false;
        this.user = response;
        //return this.user;
      })
      .catch(err => {
        this.loading = false;
        let alert = this.alertCtrl.create({ title: 'Error', message: 'Error on get user info', buttons: ['Ok'] });
        alert.present();
      })
  }

  openNovoAgendamento()
  {
    this.navCtrl.push(AgendaPage);
  }

  onDaySelect($event)
  {
   
    this.data = $event.year+'-'+($event.month+1)+'-'+$event.date;
 
    this.getPacientesAgendados(this.data);
  }

  getPacientesAgendados(data)
  {
    console.log("Data: "+data);
    this.loading = true;
    this.userService.getUserInfo()
      .then((response: any) => {
        this.loading = false;
        this.user = response;
        this.userService.getPacientesAgendados(data, this.user.id)
            .then((response: any) => {
              this.loading = false;
              this.agendamentos = response.data;
              console.log('AGENDAMENTOS:', this.agendamentos);
            })
            .catch(err => {
              console.log(err);
              this.loading = false;
              let alert = this.alertCtrl.create({ title: 'Error', message: 'Erro ao recuperar agendamentos', buttons: ['Ok'] });
              alert.present();
            })
        })
      .catch(err => {
        this.loading = false;
        let alert = this.alertCtrl.create({ title: 'Error', message: 'Error on get user info', buttons: ['Ok'] });
        alert.present();
      })
    this.loading = true;
    
  }

  showConfirmAlert(agenda_id) {
    console.log(agenda_id);
    let alert = this.alertCtrl.create({
        title: 'Alerta',
        message: 'Você tem certeza que deseja desmarcar esta consulta?',
        buttons: [
            {
                text: 'No',
                handler: () => {
                    console.log('Cancel clicked');
                }
            },
            {
                text: 'Yes',
                handler: () => {
                   this.desmarcar(agenda_id);
                }
            }
        ]
    })
  }

  desmarcar(agenda_id)
  {
    console.log(agenda_id);
    //this.loading.present();
    this.userService.desmarcar(agenda_id)
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
