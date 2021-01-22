import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-setor-form',
  templateUrl: './setor-form.component.html',
  styleUrls: ['./setor-form.component.css']
})
export class SetorFormComponent implements OnInit {

  id;
  url = 'setor';
  titulo = 'Setor';
  operacao = 'Cadastrar';
  mensagem = 'Cadastre um novo setor';
  @Input() config = {
    titulo: 'setor',
    cabecalhos: [
      'dsc_setor'
    ],
    tipos: [
      'text'
    ],
    mascaras: [],
    obrigatorios: [
      'dsc_setor'
    ],
    desabilitados: []
  };

  constructor(
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => this.id = params['id']);
    if(this.id !== undefined) {
      this.operacao = 'Editar';
      this.mensagem = 'Edite o setor selecionado';
    }
  }

  ngOnInit(): void {
  }
}