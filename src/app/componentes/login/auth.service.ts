import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = environment.apiURL;

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
        this.router.navigate(['']);
      }
      else
        alert(data.body['data']['mensagem']);
    });
  }
}