import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { ValidateService } from '../geral/validate/validate.service';
import { FacebookService } from '@greg-md/ng-facebook';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: any = {};
  settings = {
    appId : '867540823809372',
    version: 'v9.0',
  };

  constructor(
    private authService: AuthService,
    private validate: ValidateService,
    public facebookService: FacebookService
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

  fazerLoginFB(){
    this.facebookService.init(this.settings).subscribe();
    this.facebookService.login({scope: 'email'}).subscribe(auth => {
      var bodyToken = {accessToken: auth.accessToken};
      this.authService.fazerAuthFB(bodyToken);
    });
  }
}