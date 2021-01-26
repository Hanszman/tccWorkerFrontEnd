import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cliente-read',
  templateUrl: './cliente-read.component.html',
  styleUrls: ['./cliente-read.component.css']
})
export class ClienteReadComponent implements OnInit {

  url = 'cliente';
  titulo = 'Cliente';
  parametros;
  id_empresa = window.localStorage.getItem('id_empresa');
  @Input() config = {
    titulo: 'cliente',
    cabecalhos: [
      'dsc_nome',
      'dsc_cnpj'
    ],
    paginacao: 5
  };

  constructor() {
    this.parametros = 'id_empresa=' + this.id_empresa + '&';
  }

  ngOnInit(): void {
  }
}