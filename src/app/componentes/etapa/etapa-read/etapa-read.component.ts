import { Component, OnInit, Input } from '@angular/core';

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
  ind_controle_acesso = window.localStorage.getItem('ind_controle_acesso');
  existemBotoes = false;
  @Input() config = {
    titulo: 'etapa',
    cabecalhos: [
      'dsc_etapa',
      'ind_sequencia'
    ],
    paginacao: 5
  };

  constructor() {
    this.parametros = 'id_empresa=' + this.id_empresa + '&';
    if (this.ind_controle_acesso != 'C')
      this.existemBotoes = true;
  }

  ngOnInit(): void {
  }
}