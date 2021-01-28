import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-atividade-detail',
  templateUrl: './atividade-detail.component.html',
  styleUrls: ['./atividade-detail.component.css']
})
export class AtividadeDetailComponent implements OnInit {

  id;
  url = 'atividade';
  titulo = 'Atividade';
  parametros;
  @Input() config = {
    titulo: 'atividade',
    cabecalhos: [
      'dsc_nome',
      'dsc_descricao',
      'dat_inicio',
      'dat_fim',
      'dsc_etapa',
      'dsc_quadro',
      'dsc_projeto'
    ]
  };

  constructor(
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => this.id = params['id']);
    this.parametros = 'id_atividade=' + this.id + '&';
  }

  ngOnInit(): void {
  }
}