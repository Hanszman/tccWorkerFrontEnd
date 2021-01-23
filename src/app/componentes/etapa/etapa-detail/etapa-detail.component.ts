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
  titulo = 'Etapa';
  parametros;
  @Input() config = {
    titulo: 'etapa',
    cabecalhos: [
      'dsc_etapa',
      'ind_sequencia'
    ]
  };

  constructor(
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => this.id = params['id']);
    this.parametros = 'id_etapa=' + this.id + '&';
  }

  ngOnInit(): void {
  }
}