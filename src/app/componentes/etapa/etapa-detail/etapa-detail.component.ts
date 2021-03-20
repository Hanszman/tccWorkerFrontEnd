import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-etapa-detail',
  templateUrl: './etapa-detail.component.html',
  styleUrls: ['./etapa-detail.component.css']
})
export class EtapaDetailComponent implements OnInit {

  id;
  url = 'etapa';
  urlAtividade = 'atividade';
  titulo = 'Etapa';
  tituloAtividade = 'Atividade';
  parametros;
  id_empresa = window.localStorage.getItem('id_empresa');
  @Input() config = {
    titulo: 'etapa',
    cabecalhos: [
      'dsc_etapa',
      'ind_sequencia'
    ]
  };
  @Input() configAtividade = {
    titulo: 'atividade',
    cabecalhos: [
      'dsc_nome',
      'dat_inicio',
      'dat_fim',
      'ind_prioridade',
      'dsc_quadro',
      'dsc_projeto'
    ],
    paginacao: 5
  };

  constructor(
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => this.id = params['id']);
    this.parametros = 'id_etapa=' + this.id + '&id_empresa=' + this.id_empresa + '&';
  }

  ngOnInit(): void {
  }
}