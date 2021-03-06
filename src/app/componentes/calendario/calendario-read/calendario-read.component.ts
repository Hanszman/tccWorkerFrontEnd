import { Component, OnInit, Input } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { ChartComponent } from '../../geral/chart/chart.component';
import { HttpService } from '../../geral/http/http.service';

@Component({
  selector: 'app-calendario-read',
  templateUrl: './calendario-read.component.html',
  styleUrls: ['./calendario-read.component.css']
})
export class CalendarioReadComponent implements OnInit {

  listaEtapas = [];
  listaAtividades = [];
  url = 'atividade';
  titulo = 'Atividade';
  parametros;
  id_empresa = window.localStorage.getItem('id_empresa');
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
    this.service.getConsultar('etapa', this.parametros).subscribe((obj) => {
      let conjunto = obj.body.data.dados;
      let cores = this.componenteChart.selecionaCores(conjunto.length);
      for (let i = 0; i < conjunto.length; i++) {
        this.listaEtapas[i] = new Object();
        this.listaEtapas[i]['id_etapa'] = conjunto[i]['id_etapa'];
        this.listaEtapas[i]['dsc_etapa'] = conjunto[i]['dsc_etapa'];
        this.listaEtapas[i]['ind_sequencia'] = conjunto[i]['ind_sequencia'];
        this.listaEtapas[i]['dsc_cor'] = cores[i];
      }
    });
  }

  ngOnInit(): void {
    console.log(this.listaEtapas)
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locales: [ ptBrLocale ],
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.eventClick.bind(this),
    events: [
      { title: 'Event 1', color: '#348A43', date: '2021-03-01' },
      { title: 'Event 2', start: '2021-03-02', end: '2021-03-05' }
    ]
  };

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }

  eventClick(arg) {
    console.log(arg.event.title)
  }
}