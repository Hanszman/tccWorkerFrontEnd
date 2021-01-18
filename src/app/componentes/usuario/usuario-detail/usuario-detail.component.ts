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
      'dsc_cpf',
      'dsc_rg',
      'dat_nascimento',
      'dsc_login',
      'dsc_email'
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
    this.url = 'usuario/read';
    this.urlTelefone = 'telefone/read';
    this.urlEndereco = 'endereco/read';
    this.urlEmail = 'email/read';
    this.parametros = 'id_usuario=' + this.id + '&';
  }

  ngOnInit(): void {
  }

}
