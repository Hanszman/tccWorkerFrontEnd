import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../geral/http/http.service';

@Component({
  selector: 'app-projeto-form',
  templateUrl: './projeto-form.component.html',
  styleUrls: ['./projeto-form.component.css']
})
export class ProjetoFormComponent implements OnInit {

  id;
  url = 'projeto';
  titulo = 'Projeto';
  operacao = 'Cadastrar';
  mensagem = 'Cadastre um novo projeto';
  parametros;
  id_empresa = window.localStorage.getItem('id_empresa');
  @Input() config = {
    titulo: 'projeto',
    cabecalhos: [
      'dsc_nome',
      'dsc_descricao',
      'dat_inicio',
      'dat_fim',
      'id_setor'
    ],
    tipos: [
      'text',
      'text',
      'date',
      'date',
      'select'
    ],
    selects: {
      id_setor: {
        values: [],
        labels: []
      }
    },
    mascaras: [],
    obrigatorios: [
      'dsc_nome'
    ],
    desabilitados: []
  };

  constructor(
    private route: ActivatedRoute,
    private service: HttpService,
  ) {
    this.route.params.subscribe(params => this.id = params['id']);
    if(this.id !== undefined) {
      this.operacao = 'Editar';
      this.mensagem = 'Edite o projeto selecionado';
    }
    this.parametros = 'id_empresa=' + this.id_empresa + '&';
    this.service.getConsultar('setor', this.parametros).subscribe((obj) => {
      let conjunto = obj.body.data.dados;
      for (let i = 0; i < conjunto.length; i++) {
        this.config.selects.id_setor.values.push(conjunto[i]['id_setor'])
        this.config.selects.id_setor.labels.push(conjunto[i]['dsc_setor'])
      }
    });
  }

  ngOnInit(): void {
  }
}