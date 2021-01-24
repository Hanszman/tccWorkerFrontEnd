import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html',
  styleUrls: ['./empresa-form.component.css']
})
export class EmpresaFormComponent implements OnInit {

  id;
  url = 'empresa';
  titulo = 'Empresa';
  operacao = 'Cadastrar';
  mensagem = 'Cadastre uma nova empresa';
  fotoUrl = 'assets/images/user_group_icon.png';
  @Input() config = {
    titulo: 'empresa',
    cabecalhos: [
      'dsc_nome',
      'dsc_cnpj',
      'dat_fundacao',
      'arq_foto'
    ],
    tipos: [
      'text',
      'text',
      'date',
      'file'
    ],
    selects: {},
    mascaras: [
      '',
      '00.000.000/0000-00',
    ],
    obrigatorios: [
      'dsc_nome'
    ],
    desabilitados: []
  };

  constructor(
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => this.id = params['id']);
    if(this.id !== undefined) {
      this.operacao = 'Editar';
      this.mensagem = 'Edite a empresa selecionada';
    }
  }

  ngOnInit(): void {
  }
}