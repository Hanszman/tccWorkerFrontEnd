import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quadro-detail',
  templateUrl: './quadro-detail.component.html',
  styleUrls: ['./quadro-detail.component.css']
})
export class QuadroDetailComponent implements OnInit {

  id;
  url = 'quadro';
  titulo = 'Quadro';
  parametros;
  @Input() config = {
    titulo: 'quadro',
    cabecalhos: [
      'dsc_nome',
      'dsc_descricao',
      'dat_inicio',
      'dat_fim',
      'dsc_projeto'
    ]
  };

  constructor(
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => this.id = params['id']);
    this.parametros = 'id_quadro=' + this.id + '&';
  }

  ngOnInit(): void {
  }
}