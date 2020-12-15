import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empresa-read',
  templateUrl: './empresa-read.component.html',
  styleUrls: ['./empresa-read.component.css']
})
export class EmpresaReadComponent implements OnInit {

  apiURL = environment.apiURL;
  listaEmpresas: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    window.localStorage.removeItem('token_empresa');
    window.localStorage.removeItem('id_empresa');
    window.localStorage.removeItem('dsc_empresa');
    this.exibirEmpresas();
  }

  exibirEmpresas(){
    return this.http.get(this.apiURL + 'empresa/read', {
      observe: 'response'
    }).subscribe(data => {
      this.listaEmpresas = data.body['data'];
    });
  }

  selecionarEmpresa(id_empresa, dsc_empresa){
    window.localStorage.setItem('token_empresa', 'true');
    window.localStorage.setItem('id_empresa', id_empresa);
    window.localStorage.setItem('dsc_empresa', dsc_empresa);
    this.router.navigate(['']);
  }
}
