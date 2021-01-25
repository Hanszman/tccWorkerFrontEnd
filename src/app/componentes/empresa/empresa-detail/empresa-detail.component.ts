import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-empresa-detail',
  templateUrl: './empresa-detail.component.html',
  styleUrls: ['./empresa-detail.component.css']
})
export class EmpresaDetailComponent implements OnInit {

  id;
  url = 'empresa';
  urlTelefone = 'telefone';
  urlEndereco = 'endereco';
  urlEmail = 'email';
  titulo = 'Empresa';
  tituloTelefone = 'Telefone';
  tituloEndereco = 'Endereço';
  tituloEmail = 'E-mail';
  parametros;
  fotoUrl = 'assets/images/user_group_icon.png'
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
    tipos: [
      'select',
      'text'
    ],
    selects: {
      ind_tipo: {
        values: ['F', 'C', 'R', 'T', 'O'],
        labels: ['Fixo', 'Celular', 'Residencial', 'Trabalho', 'Outro']
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
    this.parametros = 'id_empresa=' + this.id + '&';
  }

  ngOnInit(): void {
  }
}
