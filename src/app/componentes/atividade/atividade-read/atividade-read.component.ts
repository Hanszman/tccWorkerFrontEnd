import { Component, OnInit, Input } from '@angular/core';
import { ChartComponent } from '../../geral/chart/chart.component';
import { HttpService } from '../../geral/http/http.service';

@Component({
  selector: 'app-atividade-read',
  templateUrl: './atividade-read.component.html',
  styleUrls: ['./atividade-read.component.css']
})
export class AtividadeReadComponent implements OnInit {

  url = 'atividade';
  titulo = 'Atividade';
  parametros;
  id_usuario = window.localStorage.getItem('id_usuario');
  id_empresa = window.localStorage.getItem('id_empresa');
  id_usuario_empresa = window.localStorage.getItem('id_usuario_empresa');
  listaUsuarios = [];
  chartAtividadeEtapa;
  chartAtividadePrioridadeEtapa;
  private componenteChart = new ChartComponent();
  @Input() config = {
    titulo: 'atividade',
    cabecalhos: [
      'dsc_nome',
      'dat_inicio',
      'dat_fim',
      'ind_prioridade',
      'dsc_etapa',
      'dsc_quadro',
      'dsc_projeto'
    ],
    links: {
      dsc_etapa: {
        id: 'id_etapa',
        rota: 'etapa'
      },
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

  constructor(
    private service: HttpService
  ) {
    this.parametros = 'id_empresa=' + this.id_empresa + '&';
  }

  ngOnInit(): void {
    this.criaFiltroUsuarios();
    this.atividadeEtapaChart(this.id_usuario_empresa);
    this.atividadePrioridadeEtapaChart(this.id_usuario_empresa);
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
    let id_usuario_evento = event.target.value;
    if (id_usuario_evento == 0){
      this.atividadeEtapaChart();
      this.atividadePrioridadeEtapaChart();
    }
    else {
      this.atividadeEtapaChart(id_usuario_evento);
      this.atividadePrioridadeEtapaChart(id_usuario_evento);
    }
  }

  atividadeEtapaChart(id_usuario_filtro = undefined){
    var url = 'atividade_etapa?id_empresa=' + this.id_empresa;
    if (id_usuario_filtro)
      url += '&id_usuario_empresa=' + id_usuario_filtro;
    this.service.getChart(url).subscribe(resp => {
      var resposta = resp.body.data;
      if (typeof(this.chartAtividadeEtapa) != "undefined")
        this.chartAtividadeEtapa.destroy();
      this.chartAtividadeEtapa = this.componenteChart.configuraChart(
        'chartAtividadeEtapa',
        'doughnut',
        resposta['tipos'],
        resposta['eixoX'],
        resposta['legendas'],
        [resposta['eixoY']],
        [this.componenteChart.selecionaCores(resposta['eixoY'].length)],
        'Quantidade de Atividades por Etapa'
      );
    });
  }

  atividadePrioridadeEtapaChart(id_usuario_filtro = undefined){
    var url = 'atividade_prioridade_etapa?id_empresa=' + this.id_empresa;
    if (id_usuario_filtro)
      url += '&id_usuario_empresa=' + id_usuario_filtro;
    this.service.getChart(url).subscribe(resp => {
      var resposta = resp.body.data;
      if (typeof(this.chartAtividadePrioridadeEtapa) != "undefined")
        this.chartAtividadePrioridadeEtapa.destroy();
      this.chartAtividadePrioridadeEtapa = this.componenteChart.configuraChart(
        'chartAtividadePrioridadeEtapa',
        'bar',
        resposta['tipos'],
        resposta['eixoX'],
        resposta['legendas'],
        resposta['eixoY'],
        this.componenteChart.selecionaCores(resposta['tipos'].length),
        'Quantidade de Atividades por Prioridade e por Etapa',
        true
      );
    });
  }
}