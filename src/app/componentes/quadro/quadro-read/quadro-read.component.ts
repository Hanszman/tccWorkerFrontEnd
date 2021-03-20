import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-quadro-read',
  templateUrl: './quadro-read.component.html',
  styleUrls: ['./quadro-read.component.css']
})
export class QuadroReadComponent implements OnInit {

  url = 'quadro';
  titulo = 'Quadro';
  parametros;
  id_empresa = window.localStorage.getItem('id_empresa');
  @Input() config = {
    titulo: 'quadro',
    cabecalhos: [
      'dsc_nome',
      'dat_inicio',
      'dat_fim',
      'dsc_projeto'
    ],
    links: {
      dsc_projeto: {
        id: 'id_projeto',
        rota: 'projeto'
      }
    },
    paginacao: 5
  };

  constructor() {
    this.parametros = 'id_empresa=' + this.id_empresa + '&';
  }

  ngOnInit(): void {
  }
}