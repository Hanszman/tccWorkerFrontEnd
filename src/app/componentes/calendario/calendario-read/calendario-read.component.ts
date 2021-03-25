import { Component, OnInit, Input } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { Router } from '@angular/router';
import { HttpService } from '../../geral/http/http.service';
import { ChartComponent } from '../../geral/chart/chart.component';

@Component({
  selector: 'app-calendario-read',
  templateUrl: './calendario-read.component.html',
  styleUrls: ['./calendario-read.component.css']
})
export class CalendarioReadComponent implements OnInit {

  listaEtapas = [];
  url = 'atividade';
  titulo = 'Atividade';
  parametros;
  parametrosAtividades;
  id_usuario = window.localStorage.getItem('id_usuario');
  id_empresa = window.localStorage.getItem('id_empresa');
  id_usuario_empresa = window.localStorage.getItem('id_usuario_empresa');
  listaUsuarios = [];
  private componenteChart = new ChartComponent();
  @Input() config = {
    titulo: 'atividade',
    cabecalhos: [
      'dsc_nome',
      'dat_inicio',
      'dat_fim',
      'ind_prioridade',
      'dsc_etapa',
      'dsc_quadro',
      'dsc_projeto'
    ],
    links: {
      dsc_etapa: {
        id: 'id_etapa',
        rota: 'etapa'
      },
      dsc_quadro: {
        id: 'id_quadro',
        rota: 'quadro'
      },
      dsc_projeto: {
        id: 'id_projeto',
        rota: 'projeto'
      }
    },
    paginacao: 5
  };
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locales: [ ptBrLocale ],
    eventClick: this.clicaEvento.bind(this),
    events: []
  };

  constructor(
    private router: Router,
    private service: HttpService
  ) {
    this.parametros = 'id_empresa=' + this.id_empresa + '&';
    this.parametrosAtividades = this.parametros + 'isForm=1&';
  }

  ngOnInit(): void {
    this.criaFiltroUsuarios();
    this.criaCalendarioAtividades(this.id_usuario_empresa);
  }

  criaFiltroUsuarios(){
    this.service.getConsultar('usuario', 'id_empresa=' + this.id_empresa).subscribe(resp => {
      let usuarioResp = resp.body.data.dados;
      for (let i = 0; i < usuarioResp.length; i++) {
        let usuarioObj = new Object();
        usuarioObj['id_usuario_empresa'] = usuarioResp[i]['id_usuario_empresa'];
        usuarioObj['dsc_nome_completo'] = usuarioResp[i]['dsc_nome_completo'];
        if (this.id_usuario == usuarioResp[i]['id_usuario'])
          usuarioObj['selected'] = true;
        else
          usuarioObj['selected'] = false;
        this.listaUsuarios.push(usuarioObj);
      }
    });
  }

  alteraFiltroUsuarios(event){
    let id_usuario_evento = event.target.value;
    if (id_usuario_evento == 0)
      this.criaCalendarioAtividades();
    else
      this.criaCalendarioAtividades(id_usuario_evento);
  }

  criaCalendarioAtividades(id_usuario_filtro = undefined){
    let urlAtividade;
    let parametrosAdicionais;
    let nomenclatura;
    this.calendarOptions.events = [];
    if (id_usuario_filtro) {
      urlAtividade = 'atividade_usuario_empresa';
      parametrosAdicionais = 'id_usuario_empresa=' + id_usuario_filtro + '&';
      nomenclatura = '_atividade';
    }
    else {
      urlAtividade = 'atividade';
      parametrosAdicionais = '';
      nomenclatura = '';
    }
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
      this.service.getConsultar(urlAtividade, parametrosAdicionais + this.parametrosAtividades).subscribe((obj) => {
        let conjunto = obj.body.data.dados;
        for (let i = 0; i < conjunto.length; i++) {
          for (let j = 0; j < this.listaEtapas.length; j++) {
            if (this.listaEtapas[j]['id_etapa'] == conjunto[i]['id_etapa' + nomenclatura]) {
              let eventosAtividades = {
                id: conjunto[i]['id_atividade'],
                title: conjunto[i]['dsc_nome' + nomenclatura],
                start: conjunto[i]['dat_inicio' + nomenclatura],
                end: conjunto[i]['dat_fim' + nomenclatura],
                color: this.listaEtapas[j]['dsc_cor']
              }
              this.calendarOptions.events[i] = eventosAtividades;
            }
          }
        }
      });
    });
  }

  clicaEvento(arg) {
    this.router.navigate(['atividade/read/' + arg.event.id]);
  }

  salvarPDF(){
    window.print();
  }
}