import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { ValidaCamposService } from '../../servicos/valida-campos/valida-campos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: any = {};

  constructor(
    private authService: AuthService,
    private validaCamposService: ValidaCamposService
  ) { }

  ngOnInit(): void {
    window.localStorage.clear();
  }

  fazerLogin(){
    this.validaCamposService.validaCampo(this.usuario.dsc_login, 'dsc_login', 'Informe seu usuário!');
    this.validaCamposService.validaCampo(this.usuario.dsc_senha, 'dsc_senha', 'Informe sua senha!');

    if (this.usuario.dsc_login !== undefined && this.usuario.dsc_login !== '' &&
        this.usuario.dsc_senha !== undefined && this.usuario.dsc_senha !== ''){
      this.authService.fazerAuth(this.usuario);
    }
  }
}
