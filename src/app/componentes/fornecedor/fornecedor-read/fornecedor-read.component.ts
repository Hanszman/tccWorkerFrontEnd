import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-fornecedor-read',
  templateUrl: './fornecedor-read.component.html',
  styleUrls: ['./fornecedor-read.component.css']
})
export class FornecedorReadComponent implements OnInit {

  url = 'fornecedor';
  titulo = 'Fornecedor';
  parametros;
  id_empresa = window.localStorage.getItem('id_empresa');
  @Input() config = {
    titulo: 'fornecedor',
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