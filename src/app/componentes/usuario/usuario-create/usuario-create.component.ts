import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { ValidateService } from '../../geral/validate/validate.service';

@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrls: ['./usuario-create.component.css']
})
export class UsuarioCreateComponent implements OnInit {

  usuario: any = {};
  apiURL = environment.apiURL;

  constructor(
    private http: HttpClient,
    private router: Router,
    private validate: ValidateService
  ) { }

  ngOnInit(): void {
    window.localStorage.clear();
  }

  criarUsuario(){
    this.validate.validaCampo(this.usuario.dsc_nome, 'dsc_nome', 'Informe seu nome!');
    this.validate.validaCampo(this.usuario.dsc_email, 'dsc_email', 'Informe seu e-mail!');
    this.validate.validaCampo(this.usuario.dsc_login, 'dsc_login', 'Informe seu usuário!');
    this.validate.validaCampo(this.usuario.dsc_senha, 'dsc_senha', 'Informe sua senha!');
    this.validate.validaCampo(this.usuario.dsc_confirm_senha, 'dsc_confirm_senha', 'Confirme sua senha!');

    if(this.usuario.dsc_senha !== this.usuario.dsc_confirm_senha) {
      alert('Senhas não correspondem!');
      return false;
    }

    if (this.usuario.dsc_nome !== undefined && this.usuario.dsc_nome !== '' &&
        this.usuario.dsc_email !== undefined && this.usuario.dsc_email !== '' &&
        this.usuario.dsc_login !== undefined && this.usuario.dsc_login !== '' &&
        this.usuario.dsc_senha !== undefined && this.usuario.dsc_senha !== '' &&
        this.usuario.dsc_confirm_senha !== undefined && this.usuario.dsc_confirm_senha !== ''){
      return this.http.post(this.apiURL + 'usuario/create', this.usuario, {
        observe: 'response'
      }).subscribe(data => {
        if (data.body['data']['sucesso']){
          alert(data.body['data']['mensagem']);
          this.router.navigate(['login']);
        }
        else {
          alert(data.body['data']['mensagem']);
        }
      });
    }
  }
}
