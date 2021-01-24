import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario-update',
  templateUrl: './usuario-update.component.html',
  styleUrls: ['./usuario-update.component.css']
})
export class UsuarioUpdateComponent implements OnInit {

  id;
  url = 'usuario';
  titulo = 'Usuário';
  operacao = 'Editar';
  mensagem = 'Edite seu usuário'
  fotoUrl = 'assets/images/user_icon.png'
  @Input() config = {
    titulo: 'usuario',
    cabecalhos: [
      'dsc_nome',
      'dsc_sobrenome',
      'dsc_email',
      'dsc_login',
      'dsc_senha',
      'dsc_confirm_senha',
      'dat_nascimento',
      'dsc_cpf',
      'dsc_rg',
      'arq_foto'
    ],
    tipos: [
      'text',
      'text',
      'email',
      'text',
      'password',
      'password',
      'date',
      'text',
      'text',
      'file',
    ],
    selects: {},
    mascaras: [
      '', '', '', '', '', '', '',
      '000.000.000-00'
    ],
    obrigatorios: [
      'dsc_nome',
      'dsc_email',
      'dsc_login',
      'dsc_senha',
      'dsc_confirm_senha',
    ],
    desabilitados: [
      '', '', '',
      'true'
    ]
  };

  constructor(
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit(): void {
  }

}
