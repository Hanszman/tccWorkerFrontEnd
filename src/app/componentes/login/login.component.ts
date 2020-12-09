import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: any = {};

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    window.localStorage.clear();
  }

  fazerLogin(){
    if (this.usuario.dsc_login == undefined || this.usuario.dsc_login == '') {
      var dsc_login = <HTMLElement>document.getElementById('dsc_login');
      var msg_dsc_login = <HTMLElement>document.getElementById('msg_dsc_login');
      dsc_login.classList.add('is-invalid');
      msg_dsc_login.classList.add('invalid-feedback');
      msg_dsc_login.innerHTML = 'Informe seu usuário!';
    }
    else {
      var dsc_login = <HTMLElement>document.getElementById('dsc_login');
      var msg_dsc_login = <HTMLElement>document.getElementById('msg_dsc_login');
      dsc_login.classList.remove('is-invalid');
      msg_dsc_login.classList.remove('invalid-feedback');
      msg_dsc_login.innerHTML = '';
    }

    if (this.usuario.dsc_senha == undefined || this.usuario.dsc_senha == '') {
      var dsc_senha = <HTMLElement>document.getElementById('dsc_senha');
      var msg_dsc_senha = <HTMLElement>document.getElementById('msg_dsc_senha');
      dsc_senha.classList.add('is-invalid');
      msg_dsc_senha.classList.add('invalid-feedback');
      msg_dsc_senha.innerHTML = 'Informe sua senha!';
    }
    else {
      var dsc_senha = <HTMLElement>document.getElementById('dsc_senha');
      var msg_dsc_senha = <HTMLElement>document.getElementById('msg_dsc_senha');
      dsc_senha.classList.remove('is-invalid');
      msg_dsc_senha.classList.remove('invalid-feedback');
      msg_dsc_senha.innerHTML = '';
    }

    if (this.usuario.dsc_login !== undefined && this.usuario.dsc_login !== '' &&
        this.usuario.dsc_senha !== undefined && this.usuario.dsc_senha !== ''){
      this.authService.fazerAuth(this.usuario);
    }
  }
}
