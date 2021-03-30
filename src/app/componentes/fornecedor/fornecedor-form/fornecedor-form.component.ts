import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fornecedor-form',
  templateUrl: './fornecedor-form.component.html',
  styleUrls: ['./fornecedor-form.component.css']
})
export class FornecedorFormComponent implements OnInit {

  id;
  url = 'fornecedor';
  titulo = 'Fornecedor';
  operacao = 'Cadastrar';
  mensagem = 'Cadastre um novo fornecedor';
  ind_controle_acesso = window.localStorage.getItem('ind_controle_acesso');
  existemBotoes = false;
  @Input() config = {
    titulo: 'fornecedor',
    cabecalhos: [
      'dsc_nome',
      'dsc_cnpj'
    ],
    tipos: [
      'text',
      'text'
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
      this.mensagem = 'Edite o fornecedor selecionado';
    }
    if (this.ind_controle_acesso != 'C')
      this.existemBotoes = true;
  }

  ngOnInit(): void {
  }
}