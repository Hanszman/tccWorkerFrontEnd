import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-setor-read',
  templateUrl: './setor-read.component.html',
  styleUrls: ['./setor-read.component.css']
})
export class SetorReadComponent implements OnInit {

  url = 'setor';
  titulo = 'Setor';
  parametros;
  id_empresa = window.localStorage.getItem('id_empresa');
  @Input() config = {
    titulo: 'setor',
    cabecalhos: [
      'dsc_setor'
    ],
    paginacao: 5
  };

  constructor() {
    this.parametros = 'id_empresa=' + this.id_empresa + '&';
  }

  ngOnInit(): void {
  }
}