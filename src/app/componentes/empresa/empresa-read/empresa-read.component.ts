import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { EmpresaAuthService } from '../empresa-servicos/empresa-auth.service';

@Component({
  selector: 'app-empresa-read',
  templateUrl: './empresa-read.component.html',
  styleUrls: ['./empresa-read.component.css']
})
export class EmpresaReadComponent implements OnInit {

  apiURL = environment.apiURL;
  listaEmpresas: any;
  fotoURL = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private empresaAuthService: EmpresaAuthService
  ) { }

  ngOnInit(): void {
    window.localStorage.removeItem('token_empresa');
    window.localStorage.removeItem('id_empresa');
    window.localStorage.removeItem('dsc_empresa');
    this.empresaAuthService.verificaEmpresaAuth(false);
    this.exibirEmpresas();
  }

  exibirEmpresas(){
    var id_usuario = window.localStorage.getItem('id_usuario');
    var search = <HTMLElement>document.getElementById('search');
    return this.http.get(this.apiURL + 'empresa/read?id_usuario=' + id_usuario + '&dsc_nome=' + search['value'], {
      observe: 'response'
    }).subscribe(data => {
      this.listaEmpresas = data.body['data'];
      for(let i = 0; i < this.listaEmpresas.length; i++){
        if(this.listaEmpresas[i]['arq_foto'] !== null)
          this.fotoURL[i] = this.apiURL + this.listaEmpresas[i]['arq_foto'];
        else
          this.fotoURL[i] = 'assets/images/user_group_icon.png';
      }
    });
  }

  selecionarEmpresa(id_empresa, dsc_empresa, id_usuario_empresa, ind_controle_acesso){
    window.localStorage.setItem('token_empresa', 'true');
    window.localStorage.setItem('id_empresa', id_empresa);
    window.localStorage.setItem('dsc_empresa', dsc_empresa);
    window.localStorage.setItem('id_usuario_empresa', id_usuario_empresa);
    window.localStorage.setItem('ind_controle_acesso', ind_controle_acesso);
    this.empresaAuthService.verificaEmpresaAuth(true);
    this.router.navigate(['']);
  }
}
