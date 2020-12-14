import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-empresa-read',
  templateUrl: './empresa-read.component.html',
  styleUrls: ['./empresa-read.component.css']
})
export class EmpresaReadComponent implements OnInit {

  apiURL = environment.apiURL;
  listaEmpresas: any;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.exibirEmpresas();
  }

  exibirEmpresas(){
    return this.http.get(this.apiURL + 'empresa/read', {
      observe: 'response'
    }).subscribe(data => {
      this.listaEmpresas = data.body['data'];
    });
  }
}
