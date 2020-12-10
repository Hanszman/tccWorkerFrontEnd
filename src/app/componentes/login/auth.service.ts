import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = environment.apiURL;
  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  fazerAuth(usuario: any){
    return this.http.post(this.apiURL + 'login', usuario, {
      observe: 'response'
    }).subscribe(data => {
      if (data.body['data']['sucesso']){
        window.localStorage.setItem('token', data.body['data']['sucesso']);
        window.localStorage.setItem('id_usuario', data.body['data']['id_usuario']);
        window.localStorage.setItem('dsc_nome', data.body['data']['dsc_nome']);
        this.mostrarMenuEmitter.emit(true);
        this.router.navigate(['']);
      }
      else {
        this.mostrarMenuEmitter.emit(false);
        alert(data.body['data']['mensagem']);
      }
    });
  }
}
