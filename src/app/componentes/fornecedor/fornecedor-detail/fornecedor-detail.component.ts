import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fornecedor-detail',
  templateUrl: './fornecedor-detail.component.html',
  styleUrls: ['./fornecedor-detail.component.css']
})
export class FornecedorDetailComponent implements OnInit {

  id;
  url;
  urlTelefone;
  urlEndereco;
  urlEmail;
  parametros;
  @Input() config = {
    titulo: 'fornecedor',
    cabecalhos: [
      'dsc_nome',
      'dsc_cnpj'
    ]
  };
  @Input() configTelefone = {
    titulo: 'telefone',
    cabecalhos: [
      'ind_tipo',
      'dsc_telefone'
    ],
    paginacao: 5
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
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => this.id = params['id']);
    this.url = 'fornecedor';
    this.urlTelefone = 'telefone';
    this.urlEndereco = 'endereco';
    this.urlEmail = 'email';
    this.parametros = 'id_fornecedor=' + this.id + '&';
  }

  ngOnInit(): void {
  }
}