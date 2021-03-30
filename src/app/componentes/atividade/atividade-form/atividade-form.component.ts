import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../geral/http/http.service';

@Component({
  selector: 'app-atividade-form',
  templateUrl: './atividade-form.component.html',
  styleUrls: ['./atividade-form.component.css']
})
export class AtividadeFormComponent implements OnInit {

  id;
  url = 'atividade';
  titulo = 'Atividade';
  operacao = 'Cadastrar';
  mensagem = 'Cadastre uma nova atividade';
  parametros;
  id_empresa = window.localStorage.getItem('id_empresa');
  ind_controle_acesso = window.localStorage.getItem('ind_controle_acesso');
  existemBotoes = false;
  @Input() config = {
    titulo: 'atividade',
    cabecalhos: [
      'dsc_nome',
      'dsc_descricao',
      'dat_inicio',
      'dat_fim',
      'ind_prioridade',
      'id_etapa',
      'id_quadro'
    ],
    tipos: [
      'text',
      'text',
      'date',
      'date',
      'select',
      'select',
      'select'
    ],
    selects: {
      ind_prioridade: {
        values: ['B','N','A','U'],
        labels: ['Baixa','Normal','Alta','Urgente']
      },
      id_etapa: {
        values: [],
        labels: []
      },
      id_quadro: {
        values: [],
        labels: []
      }
    },
    mascaras: [],
    obrigatorios: [
      'dsc_nome',
      'ind_prioridade',
      'id_etapa',
      'id_quadro'
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
      this.mensagem = 'Edite a atividade selecionada';
    }
    this.parametros = 'id_empresa=' + this.id_empresa + '&';
    this.service.getConsultar('etapa', this.parametros).subscribe((obj) => {
      let conjunto = obj.body.data.dados;
      for (let i = 0; i < conjunto.length; i++) {
        this.config.selects.id_etapa.values.push(conjunto[i]['id_etapa']);
        this.config.selects.id_etapa.labels.push(conjunto[i]['dsc_etapa']);
      }
    });
    this.service.getConsultar('quadro', this.parametros).subscribe((obj) => {
      let conjunto = obj.body.data.dados;
      for (let i = 0; i < conjunto.length; i++) {
        this.config.selects.id_quadro.values.push(conjunto[i]['id_quadro']);
        this.config.selects.id_quadro.labels.push(conjunto[i]['dsc_nome']);
      }
    });
    if (this.ind_controle_acesso != 'C')
      this.existemBotoes = true;
  }

  ngOnInit(): void {
  }
}