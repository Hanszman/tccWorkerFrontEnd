import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-projeto-form',
  templateUrl: './projeto-form.component.html',
  styleUrls: ['./projeto-form.component.css']
})
export class ProjetoFormComponent implements OnInit {

  id;
  url = 'projeto';
  titulo = 'Projeto';
  operacao = 'Cadastrar';
  mensagem = 'Cadastre um novo projeto';
  @Input() config = {
    titulo: 'projeto',
    cabecalhos: [
      'dsc_nome',
      'dsc_descricao',
      'dat_inicio',
      'dat_fim',
      'id_setor'
    ],
    tipos: [
      'text',
      'text',
      'date',
      'date',
      'select'
    ],
    selects: {
      id_setor: {
        values: [],
        labels: []
      }
    },
    mascaras: [],
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
      this.mensagem = 'Edite o projeto selecionado';
    }
  }

  ngOnInit(): void {
  }
}