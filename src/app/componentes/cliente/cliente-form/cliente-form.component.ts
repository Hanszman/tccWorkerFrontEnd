import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {

  id;
  url = 'cliente';
  titulo = 'Cliente';
  operacao = 'Cadastrar';
  mensagem = 'Cadastre um novo cliente';
  @Input() config = {
    titulo: 'cliente',
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
      this.mensagem = 'Edite o cliente selecionado';
    }
  }

  ngOnInit(): void {
  }
}