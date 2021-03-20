import { Component, OnInit } from '@angular/core';
import { ChartComponent } from '../geral/chart/chart.component';
import { Router } from '@angular/router';
import { HttpService } from '../geral/http/http.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  apiURL = environment.apiURL;
  id_usuario = window.localStorage.getItem('id_usuario');
  dsc_nome = window.localStorage.getItem('dsc_nome');
  id_empresa = window.localStorage.getItem('id_empresa');
  dsc_empresa = window.localStorage.getItem('dsc_empresa');
  objUsuario;
  objEmpresa;
  fotoUsuario;
  fotoEmpresa;
  chartAtividadeEtapa;
  chartAtividadePrioridadeEtapa;
  chartAtividadeFuncionarioEtapa;
  chartAtividadeSetorEtapa;
  private componenteChart = new ChartComponent();

  constructor(
    private router: Router,
    private service: HttpService
  ) { }

  ngOnInit(): void {
    this.detalhesUsuario();
    this.detalhesEmpresa();
    this.atividadeEtapaChart();
    this.atividadePrioridadeEtapaChart();
    this.atividadeFuncionarioEtapaChart();
    this.atividadeSetorEtapaChart();
  }

  detalhesUsuario(){
    this.service.getDetail('usuario/read', this.id_usuario, 'id_empresa=' + this.id_empresa).subscribe(resp => {
      this.objUsuario = resp.body.data;
      if (this.objUsuario[0]['arq_foto'] !== null)
        this.fotoUsuario = this.apiURL + this.objUsuario[0]['arq_foto'];
      else
        this.fotoUsuario = 'assets/images/user_icon.png';
    });
  }

  detalhesEmpresa(){
    this.service.getDetail('empresa/read', this.id_empresa).subscribe(resp => {
      this.objEmpresa = resp.body.data;
      if (this.objEmpresa[0]['arq_foto'] !== null)
        this.fotoEmpresa = this.apiURL + this.objEmpresa[0]['arq_foto'];
      else
        this.fotoEmpresa = 'assets/images/user_group_icon.png';
    });
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

  rotaDetalhesFuncionario(id_funcionario){
    window.scrollTo(0,0);
    this.router.navigate(['usuario/read/'], {queryParams: {id_funcionario_parametro: id_funcionario}});
  }

  salvarPDF(){
    window.print();
  }
}