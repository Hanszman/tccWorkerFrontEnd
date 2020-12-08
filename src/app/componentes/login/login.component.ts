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
    if (this.usuario.dsc_login == undefined || this.usuario.dsc_login == '')
      alert('Informe seu usuário!')
    else if (this.usuario.dsc_senha == undefined || this.usuario.dsc_senha == '')
      alert('Informe sua senha!')
    else
      this.authService.fazerAuth(this.usuario);
  }
}
