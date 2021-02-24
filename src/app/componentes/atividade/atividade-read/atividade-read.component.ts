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
  id_empresa = window.localStorage.getItem('id_empresa');
  chartAtividadePrioridadeEtapa;
  private componenteChart = new ChartComponent();
  @Input() config = {
    titulo: 'atividade',
    cabecalhos: [
      'dsc_nome',
      'dsc_descricao',
      'dat_inicio',
      'dat_fim',
      'ind_prioridade',
      'dsc_etapa',
      'dsc_quadro',
      'dsc_projeto'
    ],
    paginacao: 5
  };

  constructor(
    private service: HttpService
  ) {
    this.parametros = 'id_empresa=' + this.id_empresa + '&';
  }

  ngOnInit(): void {
    this.atividadeSetorPrioridadeChart();
  }

  atividadeSetorPrioridadeChart(){
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
}