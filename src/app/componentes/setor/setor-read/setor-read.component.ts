import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    ]
  };

  constructor(
    private route: ActivatedRoute
  ) {
    this.url = 'setor/read';
    this.parametros = 'id_empresa=' + this.id_empresa + '&';
  }

  ngOnInit(): void {
  }
}