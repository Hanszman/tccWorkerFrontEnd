import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-setor-detail',
  templateUrl: './setor-detail.component.html',
  styleUrls: ['./setor-detail.component.css']
})
export class SetorDetailComponent implements OnInit {

  id;
  url;
  urlTelefone;
  urlEndereco;
  urlEmail;
  parametros;
  @Input() config = {
    titulo: 'setor',
    cabecalhos: [
      'dsc_setor'
    ]
  };
  
  constructor(
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => this.id = params['id']);
    this.url = 'setor';
    this.parametros = 'id_setor=' + this.id + '&';
  }

  ngOnInit(): void {
  }
}