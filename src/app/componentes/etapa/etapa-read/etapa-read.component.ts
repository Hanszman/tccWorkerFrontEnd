import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-etapa-read',
  templateUrl: './etapa-read.component.html',
  styleUrls: ['./etapa-read.component.css']
})
export class EtapaReadComponent implements OnInit {

  url = 'etapa';
  titulo = 'Etapa';
  parametros;
  id_empresa = window.localStorage.getItem('id_empresa');
  @Input() config = {
    titulo: 'etapa',
    cabecalhos: [
      'dsc_etapa',
      'ind_sequencia'
    ],
    paginacao: 5
  };

  constructor(
    private router: Router
  ) {
    this.parametros = 'id_empresa=' + this.id_empresa + '&';
  }

  ngOnInit(): void {
  }
}