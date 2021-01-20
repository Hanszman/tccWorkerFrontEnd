import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setor-read',
  templateUrl: './setor-read.component.html',
  styleUrls: ['./setor-read.component.css']
})
export class SetorReadComponent implements OnInit {

  url;
  parametros;
  id_empresa = window.localStorage.getItem('id_empresa');
  @Input() config = {
    titulo: 'setor',
    cabecalhos: [
      'dsc_setor'
    ],
    paginacao: 5
  };

  constructor(
    private router: Router
  ) {
    this.url = 'setor';
    this.parametros = 'id_empresa=' + this.id_empresa + '&';
  }

  ngOnInit(): void {
  }
}