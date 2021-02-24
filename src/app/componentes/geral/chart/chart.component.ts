import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  selecionaCores(length){
    var result = [];
    var cores = ['#0C8CBF','#FD7D1B','#03AF56','#FDD41B','#32d3b6','#8A51C4','#D42333','#EB5493','#5E6566','#0A7078'];
    for(let i = 0; i < length; i++)
      result.push(cores[i%10])
    return result;
  }

  configuraChart(id, tipo, tipos, eixoX, legendas, eixoY, cores, title = '', stacked = false, preencher = false, beginAtZero = true, opcoes = {}){
    Chart.defaults.scale.ticks.beginAtZero = beginAtZero;
    var objetoDados = [];
    for(let i = 0; i < legendas.length; i++){
      objetoDados[i] = new Object();
      objetoDados[i]['label'] = legendas[i];
      objetoDados[i]['type'] = tipos[i];
      objetoDados[i]['data'] = eixoY[i];
      objetoDados[i]['backgroundColor'] = cores[i];
      objetoDados[i]['borderColor'] = cores[i];
      objetoDados[i]['fill'] = preencher;
    }
    opcoes['responsive'] = true;
    if (title != '' && title != undefined) {
      opcoes['title'] = {
        display: true,
        text: title
      };
    }
    if (stacked) {
      opcoes['scales'] = {
        xAxes: [{
          stacked: true,
        }],
        yAxes: [{
          stacked: true
        }]
      };
    }
    var chart = new Chart(id, {
      type: tipo,
      data: {
        labels: eixoX,
        datasets: objetoDados
      },
      options: opcoes
    });
    return chart;
  }
}