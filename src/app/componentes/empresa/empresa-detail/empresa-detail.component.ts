import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-empresa-detail',
  templateUrl: './empresa-detail.component.html',
  styleUrls: ['./empresa-detail.component.css']
})
export class EmpresaDetailComponent implements OnInit {

  apiURL = environment.apiURL;
  detalhesEmpresa: any;
  id;
  url;
  urlTelefone;
  urlEndereco;
  urlEmail;
  parametros;
  @Input() config = {
    titulo: 'empresa',
    cabecalhos: [
      'dsc_nome',
      'dsc_cnpj',
      'dat_fundacao',
      'qtd_usuario'
    ]
  };
  @Input() configTelefone = {
    titulo: 'telefone',
    cabecalhos: [
      'ind_tipo',
      'dsc_telefone'
    ],
    paginacao: 1
  };
  @Input() configEndereco = {
    titulo: 'endereco',
    cabecalhos: [
      'dsc_logradouro',
      'dsc_numero',
      'dsc_bairro',
      'dsc_cidade',
      'dsc_uf'
    ],
    paginacao: 5
  };
  @Input() configEmail = {
    titulo: 'email',
    cabecalhos: [
      'dsc_email'
    ],
    paginacao: 5
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.route.params.subscribe(params => this.id = params['id']);
    this.url = 'empresa/read';
    this.urlTelefone = 'telefone/read';
    this.urlEndereco = 'endereco/read';
    this.urlEmail = 'email/read';
    this.parametros = 'id_empresa=' + this.id + '&';
  }

  ngOnInit(): void {
    this.detalharEmpresa();
  }

  detalharEmpresa(){
    return this.http.get(this.apiURL + 'empresa/read/' + this.id, {
      observe: 'response'
    }).subscribe(data => {
      this.detalhesEmpresa = data.body['data'];
    });
  }
}
