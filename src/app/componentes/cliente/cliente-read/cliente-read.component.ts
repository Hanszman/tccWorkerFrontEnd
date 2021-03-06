import { Component, OnInit, Input } from '@angular/core';
import { ChartComponent } from '../../geral/chart/chart.component';
import { HttpService } from '../../geral/http/http.service';

@Component({
  selector: 'app-cliente-read',
  templateUrl: './cliente-read.component.html',
  styleUrls: ['./cliente-read.component.css']
})
export class ClienteReadComponent implements OnInit {

  url = 'cliente';
  titulo = 'Cliente';
  parametros;
  id_empresa = window.localStorage.getItem('id_empresa');
  ind_controle_acesso = window.localStorage.getItem('ind_controle_acesso');
  existemBotoes = false;
  chartProjetoCliente;
  chartAtividadeClienteEtapa;
  private componenteChart = new ChartComponent();
  @Input() config = {
    titulo: 'cliente',
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
    this.projetoClienteChart();
    this.atividadeClienteEtapaChart();
  }

  projetoClienteChart(){
    var url = 'projeto_cliente?id_empresa=' + this.id_empresa;
    this.service.getChart(url).subscribe(resp => {
      var resposta = resp.body.data;
      if (typeof(this.chartProjetoCliente) != "undefined")
        this.chartProjetoCliente.destroy();
      this.chartProjetoCliente = this.componenteChart.configuraChart(
        'chartProjetoCliente',
        'doughnut',
        resposta['tipos'],
        resposta['eixoX'],
        resposta['legendas'],
        [resposta['eixoY']],
        [this.componenteChart.selecionaCores(resposta['eixoY'].length)],
        'Quantidade de Projetos por Cliente'
      );
    });
  }

  atividadeClienteEtapaChart(){
    var url = 'atividade_cliente_etapa?id_empresa=' + this.id_empresa;
    this.service.getChart(url).subscribe(resp => {
      var resposta = resp.body.data;
      if (typeof(this.chartAtividadeClienteEtapa) != "undefined")
        this.chartAtividadeClienteEtapa.destroy();
      this.chartAtividadeClienteEtapa = this.componenteChart.configuraChart(
        'chartAtividadeClienteEtapa',
        'bar',
        resposta['tipos'],
        resposta['eixoX'],
        resposta['legendas'],
        resposta['eixoY'],
        this.componenteChart.selecionaCores(resposta['tipos'].length),
        'Rendimento de Atividades por Cliente e por Etapa',
        true
      );
    });
  }
}