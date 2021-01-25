import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projeto-read',
  templateUrl: './projeto-read.component.html',
  styleUrls: ['./projeto-read.component.css']
})
export class ProjetoReadComponent implements OnInit {

  url = 'projeto';
  titulo = 'Projeto';
  parametros;
  id_empresa = window.localStorage.getItem('id_empresa');
  @Input() config = {
    titulo: 'projeto',
    cabecalhos: [
      'dsc_nome',
      'dsc_descricao',
      'dat_inicio',
      'dat_fim',
      'id_setor',
      'dsc_setor'
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