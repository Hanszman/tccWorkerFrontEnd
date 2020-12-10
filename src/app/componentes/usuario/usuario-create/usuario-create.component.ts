import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ValidaCamposService } from '../../../servicos/valida-campos/valida-campos.service';

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
    private validaCamposService: ValidaCamposService
  ) { }

  ngOnInit(): void {
    window.localStorage.clear();
  }

  criarUsuario(){
    this.validaCamposService.validaCampo(this.usuario.dsc_nome, 'dsc_nome', 'Informe seu nome!');
    this.validaCamposService.validaCampo(this.usuario.dsc_email, 'dsc_email', 'Informe seu e-mail!');
    this.validaCamposService.validaCampo(this.usuario.dsc_login, 'dsc_login', 'Informe seu usuário!');
    this.validaCamposService.validaCampo(this.usuario.dsc_senha, 'dsc_senha', 'Informe sua senha!');

    if (this.usuario.dsc_nome !== undefined && this.usuario.dsc_nome !== '' &&
        this.usuario.dsc_email !== undefined && this.usuario.dsc_email !== '' &&
        this.usuario.dsc_login !== undefined && this.usuario.dsc_login !== '' &&
        this.usuario.dsc_senha !== undefined && this.usuario.dsc_senha !== ''){
      return this.http.post(this.apiURL + 'usuario/create', this.usuario, {
        observe: 'response'
      }).subscribe(data => {
        console.log(data.body);
      });
    }
  }
}
