import { Component, OnInit, Input } from '@angular/core';
import { ChartComponent } from '../../geral/chart/chart.component';
import { HttpService } from '../../geral/http/http.service';

@Component({
  selector: 'app-setor-read',
  templateUrl: './setor-read.component.html',
  styleUrls: ['./setor-read.component.css']
})
export class SetorReadComponent implements OnInit {

  url = 'setor';
  titulo = 'Setor';
  parametros;
  id_empresa = window.localStorage.getItem('id_empresa');
  chartProjetoSetor;
  chartAtividadeSetorEtapa;
  private componenteChart = new ChartComponent();
  @Input() config = {
    titulo: 'setor',
    cabecalhos: [
      'dsc_setor'
    ],
    paginacao: 5
  };

  constructor(
    private service: HttpService
  ) {
    this.parametros = 'id_empresa=' + this.id_empresa + '&';
  }

  ngOnInit(): void {
    this.projetoSetorChart();
    this.atividadeSetorEtapaChart();
  }

  projetoSetorChart(){
    var url = 'projeto_setor?id_empresa=' + this.id_empresa;
    this.service.getChart(url).subscribe(resp => {
      var resposta = resp.body.data;
      if (typeof(this.chartProjetoSetor) != "undefined")
        this.chartProjetoSetor.destroy();
      this.chartProjetoSetor = this.componenteChart.configuraChart(
        'chartProjetoSetor',
        'doughnut',
        resposta['tipos'],
        resposta['eixoX'],
        resposta['legendas'],
        [resposta['eixoY']],
        [this.componenteChart.selecionaCores(resposta['eixoY'].length)],
        'Quantidade de Projetos por Setor'
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