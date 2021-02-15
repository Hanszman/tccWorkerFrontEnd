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
    private servico: HttpService
  ) {
    this.parametros = 'id_empresa=' + this.id_empresa + '&';
  }

  ngOnInit(): void {
    this.atividadeSetorEtapaChart();
  }

  atividadeSetorEtapaChart(){
    var url = 'atividade_setor_etapa';
    this.servico.getChart(url).subscribe(resp => {
      var resposta = resp.body.data;
      if (typeof(this.chartAtividadeSetorEtapa) != "undefined")
        this.chartAtividadeSetorEtapa.destroy();
      this.chartAtividadeSetorEtapa = this.componenteChart.configuraChart(
        'chartAtividadeSetorEtapa',
        'bar',
        ['bar','bar','bar'],
        ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
        ['Projeto 1', 'Projeto 2', 'Projeto 3'],
        [[5,4,2,9,1],[0,2,9,8,7],[6,9,9,10,11]],
        this.componenteChart.selecionaCores(3),
        'Qtd. de Atividades por Setor e por Etapa',
        true
      );
    });
  }
}