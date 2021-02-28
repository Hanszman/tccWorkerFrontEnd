import { Component, OnInit } from '@angular/core';
import { ChartComponent } from '../geral/chart/chart.component';
import { HttpService } from '../geral/http/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  id_usuario = window.localStorage.getItem('id_usuario');
  dsc_nome = window.localStorage.getItem('dsc_nome');
  id_empresa = window.localStorage.getItem('id_empresa');
  dsc_empresa = window.localStorage.getItem('dsc_empresa');
  chartAtividadeEtapa;
  chartAtividadePrioridadeEtapa;
  chartAtividadeFuncionarioEtapa;
  chartAtividadeSetorEtapa;
  private componenteChart = new ChartComponent();

  constructor(
    private service: HttpService
  ) { }

  ngOnInit(): void {
    this.atividadeEtapaChart();
    this.atividadePrioridadeEtapaChart();
    this.atividadeFuncionarioEtapaChart();
    this.atividadeSetorEtapaChart();
  }

  atividadeEtapaChart(){
    var url = 'atividade_etapa?id_empresa=' + this.id_empresa;
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

  atividadePrioridadeEtapaChart(){
    var url = 'atividade_prioridade_etapa?id_empresa=' + this.id_empresa;
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

  atividadeFuncionarioEtapaChart(){
    var url = 'atividade_funcionario_etapa?id_empresa=' + this.id_empresa;
    this.service.getChart(url).subscribe(resp => {
      var resposta = resp.body.data;
      if (typeof(this.chartAtividadeFuncionarioEtapa) != "undefined")
        this.chartAtividadeFuncionarioEtapa.destroy();
      this.chartAtividadeFuncionarioEtapa = this.componenteChart.configuraChart(
        'chartAtividadeFuncionarioEtapa',
        'horizontalBar',
        resposta['tipos'],
        resposta['eixoX'],
        resposta['legendas'],
        resposta['eixoY'],
        this.componenteChart.selecionaCores(resposta['tipos'].length),
        'Rendimento de Atividades por Funcionário e por Etapa',
        true
      );
    });
  }

  atividadeSetorEtapaChart(){
    var url = 'atividade_setor_etapa?id_empresa=' + this.id_empresa;
    this.service.getChart(url).subscribe(resp => {
      var resposta = resp.body.data;
      if (typeof(this.chartAtividadeSetorEtapa) != "undefined")
        this.chartAtividadeSetorEtapa.destroy();
      this.chartAtividadeSetorEtapa = this.componenteChart.configuraChart(
        'chartAtividadeSetorEtapa',
        'bar',
        resposta['tipos'],
        resposta['eixoX'],
        resposta['legendas'],
        resposta['eixoY'],
        this.componenteChart.selecionaCores(resposta['tipos'].length),
        'Rendimento de Atividades por Setor e por Etapa',
        true
      );
    });
  }
}
