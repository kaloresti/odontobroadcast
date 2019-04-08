import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Service } from '../../settings/Laravel';

@Injectable()
export class UserProvider {

  constructor(public http: HttpClient, private storage: Storage) {
  }

  async getUserInfo () 
  {
    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    })
    return this.http.get(`${Service.apiUrl}/user`, { headers }).toPromise()
  }

  async getPacientesAgendados (data, user_id) 
  {
    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    })
    return this.http.get(`${Service.apiUrl}/agenda/list/`+data+`/`+user_id, { headers }).toPromise()
  }

  async getPacientes () 
  {
    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    })
    return this.http.get(`${Service.apiUrl}/pacientes/listall`, { headers }).toPromise()
  }

  async getPacientesPorDentista (user_id) 
  {
    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    })
    return this.http.get(`${Service.apiUrl}/pacientes/list/`+user_id, { headers }).toPromise()
  }

  async getConsultorios () 
  {
    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    })
    return this.http.get(`${Service.apiUrl}/consultorios/listall`, { headers }).toPromise()
  }

  async getConsultoriosPorDentista (user_id) 
  {
    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    })
    return this.http.get(`${Service.apiUrl}/consultorios/list/`+user_id, { headers }).toPromise()
  }
  
  agendar(agenda)
  {
    return this.http.post(`${Service.apiUrl}/agenda/store`, agenda).toPromise();
  }

  async desmarcar(agenda_id)
  {
    let auth: any = await this.storage.get('auth');
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${auth.access_token}`,
    })
    return this.http.post(`${Service.apiUrl}/agenda/`+ agenda_id +`desmarcar`, {headers}).toPromise();
  }

}
