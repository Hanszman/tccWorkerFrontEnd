import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-projeto-detail',
  templateUrl: './projeto-detail.component.html',
  styleUrls: ['./projeto-detail.component.css']
})
export class ProjetoDetailComponent implements OnInit {

  id;
  url = 'projeto';
  urlQuadro = 'quadro';
  titulo = 'Projeto';
  tituloQuadro = 'Quadro';
  parametros;
  @Input() config = {
    titulo: 'projeto',
    cabecalhos: [
      'dsc_nome',
      'dsc_descricao',
      'dat_inicio',
      'dat_fim',
      'dsc_setor'
    ]
  };
  @Input() configQuadro = {
    titulo: 'quadro',
    cabecalhos: [
      'dsc_nome',
      'dsc_descricao',
      'dat_inicio',
      'dat_fim',
      'dsc_projeto'
    ],
    paginacao: 5
  };

  constructor(
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => this.id = params['id']);
    this.parametros = 'id_projeto=' + this.id + '&';
  }

  ngOnInit(): void {
  }
}