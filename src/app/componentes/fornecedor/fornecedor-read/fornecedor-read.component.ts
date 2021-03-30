import { Component, OnInit, Input } from '@angular/core';
import { ChartComponent } from '../../geral/chart/chart.component';
import { HttpService } from '../../geral/http/http.service';

@Component({
  selector: 'app-fornecedor-read',
  templateUrl: './fornecedor-read.component.html',
  styleUrls: ['./fornecedor-read.component.css']
})
export class FornecedorReadComponent implements OnInit {

  url = 'fornecedor';
  titulo = 'Fornecedor';
  parametros;
  id_empresa = window.localStorage.getItem('id_empresa');
  ind_controle_acesso = window.localStorage.getItem('ind_controle_acesso');
  existemBotoes = false;
  chartProjetoFornecedor;
  chartAtividadeFornecedorEtapa;
  private componenteChart = new ChartComponent();
  @Input() config = {
    titulo: 'fornecedor',
    cabecalhos: [
      'dsc_nome',
      'dsc_cnpj'
    ],
    paginacao: 5
  };

  constructor(
    private service: HttpService
  ) {
    this.parametros = 'id_empresa=' + this.id_empresa + '&';
    if (this.ind_controle_acesso != 'C')
      this.existemBotoes = true;
  }

  ngOnInit(): void {
    this.projetoFornecedorChart();
    this.atividadeFornecedorEtapaChart();
  }

  projetoFornecedorChart(){
    var url = 'projeto_fornecedor?id_empresa=' + this.id_empresa;
    this.service.getChart(url).subscribe(resp => {
      var resposta = resp.body.data;
      if (typeof(this.chartProjetoFornecedor) != "undefined")
        this.chartProjetoFornecedor.destroy();
      this.chartProjetoFornecedor = this.componenteChart.configuraChart(
        'chartProjetoFornecedor',
        'doughnut',
        resposta['tipos'],
        resposta['eixoX'],
        resposta['legendas'],
        [resposta['eixoY']],
        [this.componenteChart.selecionaCores(resposta['eixoY'].length)],
        'Quantidade de Projetos por Fornecedor'
      );
    });
  }

  atividadeFornecedorEtapaChart(){
    var url = 'atividade_fornecedor_etapa?id_empresa=' + this.id_empresa;
    this.service.getChart(url).subscribe(resp => {
      var resposta = resp.body.data;
      if (typeof(this.chartAtividadeFornecedorEtapa) != "undefined")
        this.chartAtividadeFornecedorEtapa.destroy();
      this.chartAtividadeFornecedorEtapa = this.componenteChart.configuraChart(
        'chartAtividadeFornecedorEtapa',
        'bar',
        resposta['tipos'],
        resposta['eixoX'],
        resposta['legendas'],
        resposta['eixoY'],
        this.componenteChart.selecionaCores(resposta['tipos'].length),
        'Rendimento de Atividades por Fornecedor e por Etapa',
        true
      );
    });
  }
}