import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../geral/http/http.service';

@Component({
  selector: 'app-quadro-form',
  templateUrl: './quadro-form.component.html',
  styleUrls: ['./quadro-form.component.css']
})
export class QuadroFormComponent implements OnInit {

  id;
  url = 'quadro';
  titulo = 'Quadro';
  operacao = 'Cadastrar';
  mensagem = 'Cadastre um novo quadro';
  parametros;
  id_empresa = window.localStorage.getItem('id_empresa');
  @Input() config = {
    titulo: 'quadro',
    cabecalhos: [
      'dsc_nome',
      'dsc_descricao',
      'dat_inicio',
      'dat_fim',
      'id_projeto'
    ],
    tipos: [
      'text',
      'text',
      'date',
      'date',
      'select'
    ],
    selects: {
      id_projeto: {
        values: [],
        labels: []
      }
    },
    mascaras: [],
    obrigatorios: [
      'dsc_nome',
      'id_projeto'
    ],
    desabilitados: []
  };

  constructor(
    private route: ActivatedRoute,
    private service: HttpService
  ) {
    this.route.params.subscribe(params => this.id = params['id']);
    if(this.id !== undefined) {
      this.operacao = 'Editar';
      this.mensagem = 'Edite o quadro selecionado';
    }
    this.parametros = 'id_empresa=' + this.id_empresa + '&';
    this.service.getConsultar('projeto', this.parametros).subscribe((obj) => {
      let conjunto = obj.body.data.dados;
      for (let i = 0; i < conjunto.length; i++) {
        this.config.selects.id_projeto.values.push(conjunto[i]['id_projeto']);
        this.config.selects.id_projeto.labels.push(conjunto[i]['dsc_nome']);
      }
    });
  }

  ngOnInit(): void {
  }
}