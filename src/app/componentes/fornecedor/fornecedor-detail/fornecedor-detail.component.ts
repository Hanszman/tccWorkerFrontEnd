import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fornecedor-detail',
  templateUrl: './fornecedor-detail.component.html',
  styleUrls: ['./fornecedor-detail.component.css']
})
export class FornecedorDetailComponent implements OnInit {

  id;
  url = 'fornecedor';
  urlTelefone = 'telefone';
  urlEndereco = 'endereco';
  urlEmail = 'email';
  titulo = 'Fornecedor';
  tituloTelefone = 'Telefone';
  tituloEndereco = 'Endereço';
  tituloEmail = 'E-mail';
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
    tipos: [
      'select',
      'text'
    ],
    selects: {
      ind_tipo: {
        values: ['F', 'M', 'C', 'T', 'O'],
        labels: ['Fixo', 'Celular', 'Casa', 'Trabalho', 'Outro']
      }
    },
    mascaras: [],
    obrigatorios: [
      'ind_tipo',
      'dsc_telefone'
    ],
    desabilitados: [],
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
    tipos: [
      'text',
      'number',
      'text',
      'text',
      'select',
    ],
    selects: {
      dsc_uf: {
        values: ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'],
        labels: ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']
      }
    },
    mascaras: [],
    obrigatorios: [
      'dsc_logradouro',
      'dsc_numero'
    ],
    desabilitados: [],
    paginacao: 5
  };
  @Input() configEmail = {
    titulo: 'email',
    cabecalhos: [
      'dsc_email'
    ],
    tipos: [
      'text'
    ],
    mascaras: [],
    obrigatorios: [
      'dsc_email'
    ],
    desabilitados: [],
    paginacao: 5
  };

  constructor(
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => this.id = params['id']);
    this.parametros = 'id_fornecedor=' + this.id + '&';
  }

  ngOnInit(): void {
  }
}