import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../geral/http/http.service';

@Component({
  selector: 'app-etapa-detail',
  templateUrl: './etapa-detail.component.html',
  styleUrls: ['./etapa-detail.component.css']
})
export class EtapaDetailComponent implements OnInit {

  id;
  url = 'etapa';
  urlAtividade = 'atividade';
  urlAtividadeFuncionario = 'atividade_usuario_empresa';
  titulo = 'Etapa';
  tituloAtividade = 'Atividade';
  parametros;
  parametrosAtividadeFuncionario;
  tabelaAtividadeFuncionario = true;
  mostraTabela = true;
  id_usuario = window.localStorage.getItem('id_usuario');
  id_empresa = window.localStorage.getItem('id_empresa');
  id_usuario_empresa = window.localStorage.getItem('id_usuario_empresa');
  ind_controle_acesso = window.localStorage.getItem('ind_controle_acesso');
  listaUsuarios = [];
  existemBotoes = false;
  @Input() config = {
    titulo: 'etapa',
    cabecalhos: [
      'dsc_etapa',
      'ind_sequencia'
    ]
  };
  @Input() configAtividade = {
    titulo: 'atividade',
    cabecalhos: [
      'dsc_nome',
      'dat_inicio',
      'dat_fim',
      'ind_prioridade',
      'dsc_quadro',
      'dsc_projeto'
    ],
    links: {
      detail: true,
      dsc_quadro: {
        id: 'id_quadro',
        rota: 'quadro'
      },
      dsc_projeto: {
        id: 'id_projeto',
        rota: 'projeto'
      }
    },
    paginacao: 5
  };
  @Input() configAtividadeFuncionario = {
    titulo: 'atividade_usuario_empresa',
    cabecalhos: [
      'dsc_nome_atividade',
      'dat_inicio_atividade',
      'dat_fim_atividade',
      'ind_prioridade_atividade',
      'dsc_quadro_atividade',
      'dsc_projeto_atividade'
    ],
    links: {
      detail: true,
      dsc_quadro_atividade: {
        id: 'id_quadro_atividade',
        rota: 'quadro'
      },
      dsc_projeto_atividade: {
        id: 'id_projeto_atividade',
        rota: 'projeto'
      }
    },
    paginacao: 5
  };

  constructor(
    private route: ActivatedRoute,
    private service: HttpService
  ) {
    this.route.params.subscribe(params => this.id = params['id']);
    this.parametros = 'id_etapa=' + this.id + '&id_empresa=' + this.id_empresa + '&';
    if (this.ind_controle_acesso != 'C')
      this.existemBotoes = true;
  }

  ngOnInit(): void {
    this.criaFiltroUsuarios();
    this.criaTabelaAtividades(this.id_usuario_empresa);
  }

  criaFiltroUsuarios(){
    this.service.getConsultar('usuario', 'id_empresa=' + this.id_empresa).subscribe(resp => {
      let usuarioResp = resp.body.data.dados;
      for (let i = 0; i < usuarioResp.length; i++) {
        let usuarioObj = new Object();
        usuarioObj['id_usuario_empresa'] = usuarioResp[i]['id_usuario_empresa'];
        usuarioObj['dsc_nome_completo'] = usuarioResp[i]['dsc_nome_completo'];
        if (this.id_usuario == usuarioResp[i]['id_usuario'])
          usuarioObj['selected'] = true;
        else
          usuarioObj['selected'] = false;
        this.listaUsuarios.push(usuarioObj);
      }
    });
  }

  alteraFiltroUsuarios(event){
    this.mostraTabela = false;
    let id_usuario_evento = event.target.value;
    if (id_usuario_evento == 0)
      this.criaTabelaAtividades();
    else
      this.criaTabelaAtividades(id_usuario_evento);
  }

  criaTabelaAtividades(id_usuario_filtro = undefined){
    if (id_usuario_filtro) {
      this.parametrosAtividadeFuncionario = 'id_usuario_empresa=' + id_usuario_filtro + '&' + 'id_etapa_atividade=' + this.id + '&id_empresa_projeto_atividade=' + this.id_empresa + '&';
      this.tabelaAtividadeFuncionario = true;
    }
    else {
      this.parametrosAtividadeFuncionario = this.parametros;
      this.tabelaAtividadeFuncionario = false;
    }
    this.service.getConsultar('atividade', this.parametros).subscribe(() => {
      this.mostraTabela = true;
    });
  }
}