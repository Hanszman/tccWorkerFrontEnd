import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-atividade-read',
  templateUrl: './atividade-read.component.html',
  styleUrls: ['./atividade-read.component.css']
})
export class AtividadeReadComponent implements OnInit {

  url = 'atividade';
  titulo = 'Atividade';
  parametros;
  id_empresa = window.localStorage.getItem('id_empresa');
  @Input() config = {
    titulo: 'atividade',
    cabecalhos: [
      'dsc_nome',
      'dsc_descricao',
      'dat_inicio',
      'dat_fim',
      'ind_prioridade',
      'dsc_etapa',
      'dsc_quadro',
      'dsc_projeto'
    ],
    paginacao: 5
  };

  constructor() {
    this.parametros = 'id_empresa=' + this.id_empresa + '&';
  }

  ngOnInit(): void {
  }
}