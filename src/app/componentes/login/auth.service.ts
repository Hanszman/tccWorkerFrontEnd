import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = environment.apiURL;
  private usarioLogadoStatus = JSON.parse(localStorage.getItem('usuarioLogado') || 'false');
  private usuarioAutenticado: boolean = false;
  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  setUsuarioLogado(value: boolean){
    this.usarioLogadoStatus = value;
    localStorage.setItem('usuarioLogado', 'true')
  }

  get usuarioLogado() {
    return JSON.parse(localStorage.getItem('usuarioLogado') || this.usarioLogadoStatus.toString());
  }

  fazerAuth(usuario: any){
    return this.http.post(this.apiURL + 'login', usuario, {
      observe: 'response'
    }).subscribe(data => {
      if (data.body['data']['sucesso']){
        this.usuarioAutenticado = true;
        this.mostrarMenuEmitter.emit(true);
        this.router.navigate(['/']);
        this.setUsuarioLogado(true);
      }
      else {
        this.usuarioAutenticado = false;
        this.mostrarMenuEmitter.emit(false);
        alert(data.body['data']['mensagem']);
      }
    });

    // if(usuario.dsc_login === 'usuario@email.com' && usuario.dsc_senha === '123456'){
    //   this.usuarioAutenticado = true;
    //   this.mostrarMenuEmitter.emit(true);
    //   this.router.navigate(['/']);
    // }
    // else {
    //   this.usuarioAutenticado = false;
    //   this.mostrarMenuEmitter.emit(false);
    // }
  }
}
