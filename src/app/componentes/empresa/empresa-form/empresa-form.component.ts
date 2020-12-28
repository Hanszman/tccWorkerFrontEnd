import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html',
  styleUrls: ['./empresa-form.component.css']
})
export class EmpresaFormComponent implements OnInit {

  apiURL = environment.apiURL;
  id;
  operacao = 'Cadastrar';
  mensagem = 'Cadastre uma nova empresa'

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.route.params.subscribe(params => this.id = params['id']);
    if(this.id !== undefined) {
      this.operacao = 'Editar'
      this.mensagem = 'Edite a empresa selecionada'
    }
  }

  ngOnInit(): void {
  }

}
