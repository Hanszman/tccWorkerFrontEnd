import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-etapa-form',
  templateUrl: './etapa-form.component.html',
  styleUrls: ['./etapa-form.component.css']
})
export class EtapaFormComponent implements OnInit {

  id;
  url = 'etapa';
  titulo = 'Etapa';
  operacao = 'Cadastrar';
  mensagem = 'Cadastre uma nova etapa';
  @Input() config = {
    titulo: 'etapa',
    cabecalhos: [
      'dsc_etapa',
      'ind_sequencia'
    ],
    tipos: [
      'text',
      'number'
    ],
    mascaras: [],
    obrigatorios: [
      'dsc_etapa',
      'ind_sequencia'
    ],
    desabilitados: []
  };

  constructor(
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => this.id = params['id']);
    if(this.id !== undefined) {
      this.operacao = 'Editar';
      this.mensagem = 'Edite a etapa selecionado';
    }
  }

  ngOnInit(): void {
  }
}