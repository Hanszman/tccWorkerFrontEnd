import { Component, OnInit, Input } from '@angular/core';
import { ChartComponent } from '../../geral/chart/chart.component';
import { HttpService } from '../../geral/http/http.service';

@Component({
  selector: 'app-projeto-read',
  templateUrl: './projeto-read.component.html',
  styleUrls: ['./projeto-read.component.css']
})
export class ProjetoReadComponent implements OnInit {

  url = 'projeto';
  titulo = 'Projeto';
  parametros;
  id_empresa = window.localStorage.getItem('id_empresa');
  chartAtividadeProjetoEtapa;
  private componenteChart = new ChartComponent();
  @Input() config = {
    titulo: 'projeto',
    cabecalhos: [
      'dsc_nome',
      'dat_inicio',
      'dat_fim',
      'dsc_setor'
    ],
    links: {
      dsc_setor: {
        id: 'id_setor',
        rota: 'setor'
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
    this.atividadeProjetoEtapaChart();
  }

  atividadeProjetoEtapaChart(){
    var url = 'atividade_projeto_etapa?id_empresa=' + this.id_empresa;
    this.service.getChart(url).subscribe(resp => {
      var resposta = resp.body.data;
      if (typeof(this.chartAtividadeProjetoEtapa) != "undefined")
        this.chartAtividadeProjetoEtapa.destroy();
      this.chartAtividadeProjetoEtapa = this.componenteChart.configuraChart(
        'chartAtividadeProjetoEtapa',
        'bar',
        resposta['tipos'],
        resposta['eixoX'],
        resposta['legendas'],
        resposta['eixoY'],
        this.componenteChart.selecionaCores(resposta['tipos'].length),
        'Rendimento de Atividades por Projeto e por Etapa',
        true
      );
    });
  }
}