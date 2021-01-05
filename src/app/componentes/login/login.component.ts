import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { ValidateService } from '../geral/validate/validate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: any = {};

  constructor(
    private authService: AuthService,
    private validate: ValidateService
  ) { }

  ngOnInit(): void {
    window.localStorage.clear();
  }

  fazerLogin(){
    this.validate.validaCampo(this.usuario.dsc_login, 'dsc_login', 'Informe seu usuário!');
    this.validate.validaCampo(this.usuario.dsc_senha, 'dsc_senha', 'Informe sua senha!');

    if (this.usuario.dsc_login !== undefined && this.usuario.dsc_login !== '' &&
        this.usuario.dsc_senha !== undefined && this.usuario.dsc_senha !== ''){
      this.authService.fazerAuth(this.usuario);
    }
  }
}
