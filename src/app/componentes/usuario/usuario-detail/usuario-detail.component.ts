import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario-detail',
  templateUrl: './usuario-detail.component.html',
  styleUrls: ['./usuario-detail.component.css']
})
export class UsuarioDetailComponent implements OnInit {

  id;
  url;
  urlTelefone;
  urlEndereco;
  urlEmail;
  parametros;
  fotoUrl = 'assets/images/user_icon.png'
  @Input() config = {
    titulo: 'usuario',
    cabecalhos: [
      'dsc_nome_completo',
      'dsc_email',
      'dsc_login',
      'dat_nascimento',
      'dsc_cpf',
      'dsc_rg'
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
    this.url = 'usuario';
    this.urlTelefone = 'telefone';
    this.urlEndereco = 'endereco';
    this.urlEmail = 'email';
    this.parametros = 'id_usuario=' + this.id + '&';
  }

  ngOnInit(): void {
  }

}
