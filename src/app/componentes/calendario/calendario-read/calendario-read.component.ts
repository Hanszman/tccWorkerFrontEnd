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
  listaEventos = [];
  url = 'atividade';
  titulo = 'Atividade';
  parametros;
  parametrosAtividades;
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
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locales: [ ptBrLocale ],
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.eventClick.bind(this),
    events: []
  };

  constructor(
    private service: HttpService
  ) {
    this.parametros = 'id_empresa=' + this.id_empresa + '&';
    this.parametrosAtividades = this.parametros + 'isForm=1&';
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
    this.service.getConsultar('atividade', this.parametrosAtividades).subscribe((obj) => {
      let conjunto = obj.body.data.dados;
      for (let i = 0; i < conjunto.length; i++) {
        this.listaAtividades[i] = new Object();
        this.listaAtividades[i]['id'] = conjunto[i]['id_atividade'];
        this.listaAtividades[i]['title'] = conjunto[i]['dsc_nome'];
        this.listaAtividades[i]['start'] = conjunto[i]['dat_inicio'];
        this.listaAtividades[i]['end'] = conjunto[i]['dat_fim'];
        for (let j = 0; j < this.listaEtapas.length; j++) {
          if (this.listaEtapas[j]['id_etapa'] == conjunto[i]['id_etapa'])
            this.listaAtividades[i]['color'] = this.listaEtapas[j]['dsc_cor'];
        }
        let eventosAtividades = {
          id: this.listaAtividades[i]['id'],
          title: this.listaAtividades[i]['title'],
          color: this.listaAtividades[i]['color'],
          start: this.listaAtividades[i]['start'],
          end: this.listaAtividades[i]['end']
        }
        this.calendarOptions.events[i] = eventosAtividades;
      }
    });
  }

  ngOnInit(): void {
  }

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }

  eventClick(arg) {
    console.log(arg.event.id)
  }
}