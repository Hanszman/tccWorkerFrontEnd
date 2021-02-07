import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../geral/http/http.service';
import { TranslateService } from '@ngx-translate/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../../geral/modal/modal.component';

@Component({
  selector: 'app-quadro-detail',
  templateUrl: './quadro-detail.component.html',
  styleUrls: ['./quadro-detail.component.css']
})
export class QuadroDetailComponent implements OnInit {

  id;
  url = 'quadro';
  urlAtividade = 'atividade';
  urlFuncionario = 'atividade_usuario_empresa';
  titulo = 'Quadro';
  tituloAtividade = 'Atividade';
  parametros;
  parametrosConsulta;
  traducoes;
  traducoesFuncionario;
  id_empresa = window.localStorage.getItem('id_empresa');
  etapaList = [];
  @Input() config = {
    titulo: 'quadro',
    cabecalhos: [
      'dsc_nome',
      'dsc_descricao',
      'dat_inicio',
      'dat_fim',
      'dsc_projeto'
    ]
  };
  @Input() configAtividade = {
    titulo: 'atividade',
    cabecalhos: [
      'dsc_nome',
      'dsc_descricao',
      'dat_inicio',
      'dat_fim'
    ],
    tipos: [
      'text',
      'text',
      'date',
      'date'
    ],
    selects: {},
    mascaras: [],
    obrigatorios: [
      'dsc_nome'
    ],
    desabilitados: []
  };
  @Input() configAtividadeFuncionario = {
    titulo: 'atividade_usuario_empresa',
    cabecalhos: [
      'id_usuario_empresa'
    ],
    tipos: [
      'select'
    ],
    selects: {
      id_usuario_empresa: {
        values: [],
        labels: []
      }
    },
    mascaras: [],
    obrigatorios: [
      'id_usuario_empresa'
    ],
    desabilitados: []
  }
  @Input() configFuncionario = {
    titulo: 'atividade_usuario_empresa',
    cabecalhos: [
      'dsc_nome_completo_usuario_empresa',
      'dsc_login_usuario_empresa',
      'dsc_cargo_usuario_empresa'
    ]
  }

  constructor(
    private route: ActivatedRoute,
    private service: HttpService,
    private translate: TranslateService,
    private modalService: BsModalService
  ) {
    this.route.params.subscribe(params => this.id = params['id']);
    this.parametros = 'id_empresa=' + this.id_empresa + '&ordenarPor=ind_sequencia&direcao=asc&';
    this.parametrosConsulta = 'id_empresa=' + this.id_empresa + '&';
    this.service.getConsultar('etapa', this.parametros).subscribe((obj) => {
      let conjunto = obj.body.data.dados;
      for (let i = 0; i < conjunto.length; i++) {
        this.etapaList[i] = new Object();
        this.etapaList[i]['id_etapa'] = conjunto[i]['id_etapa'];
        this.etapaList[i]['dsc_etapa'] = conjunto[i]['dsc_etapa'];
        this.etapaList[i]['atividade_list'] = [];
        this.service.getConsultar('atividade', 'id_etapa=' + conjunto[i]['id_etapa'] + '&id_quadro=' + this.id).subscribe((innerObj) => {
          let innerConjunto = innerObj.body.data.dados;
          for (let j = 0; j < innerConjunto.length; j++) {
            this.etapaList[i]['atividade_list'][j] = new Object();
            this.etapaList[i]['atividade_list'][j]['atividade_id'] = innerConjunto[j]['id_atividade'];
            this.etapaList[i]['atividade_list'][j]['atividade_nome'] = innerConjunto[j]['dsc_nome'];
          }
        });
      }
    });
    this.service.getConsultar('usuario', this.parametrosConsulta).subscribe((obj) => {
      let conjunto = obj.body.data.dados;
      for (let i = 0; i < conjunto.length; i++) {
        this.configAtividadeFuncionario.selects.id_usuario_empresa.values.push(conjunto[i]['id_usuario_empresa']);
        this.configAtividadeFuncionario.selects.id_usuario_empresa.labels.push(conjunto[i]['dsc_nome_completo']);
      }
    });
  }

  ngOnInit(): void {
    this.traduzir('quadro').subscribe((traducoes) => {
      this.traducoes = traducoes;
    })
    this.traduzir('funcionario').subscribe((traducoesFuncionario) => {
      this.traducoesFuncionario = traducoesFuncionario;
    })
  }

  drop(event: CdkDragDrop<string[]>){
    if (event.previousContainer === event.container)
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      this.atualizarAtividadeDrop(event.item.element.nativeElement.id, event.container.id);
    }
  }

  atualizarAtividadeDrop(id_atividade, id_etapa){
    this.service.getConsultarForm('atividade/read', id_atividade).subscribe((obj) => {
      let conjunto = obj.body.data[0];
      let dados = new Object();
      dados['dsc_nome'] = conjunto['dsc_nome'];
      dados['dsc_descricao'] = conjunto['dsc_descricao'];
      dados['dat_inicio'] = conjunto['dat_inicio'];
      dados['dat_fim'] = conjunto['dat_fim'];
      dados['id_quadro'] = this.id;
      dados['id_etapa'] = id_etapa;
      this.service.putEditar('atividade/update', id_atividade, dados).subscribe((resp) => {
        if (!resp.body['data']['sucesso'])
          alert(resp.body['data']['mensagem']);
      });
    });
  }

  criarAtividadeModal(id_etapa){
    var relacoes = {
      id_etapa: id_etapa,
      id_quadro: this.id
    }
    const initialState = {
      config: this.configAtividade,
      url: this.urlAtividade,
      dadosRelacao: relacoes,
      traducoes: this.traducoes
    };
    const modalRef = this.modalService.show(ModalComponent, {initialState});
    modalRef.content.titulo = 'Cadastrar ' + this.tituloAtividade;
    modalRef.content.existeModalForm = true;
    modalRef.content.existeBotaoCriar = true;
  }

  editarAtividadeModal(id_atividade, id_etapa){
    var relacoes = {
      id_etapa: id_etapa,
      id_quadro: this.id
    }
    const initialState = {
      config: this.configAtividade,
      url: this.urlAtividade,
      id: id_atividade,
      dadosRelacao: relacoes,
      traducoes: this.traducoes
    };
    const modalRef = this.modalService.show(ModalComponent, {initialState});
    modalRef.content.titulo = 'Editar ' + this.tituloAtividade;
    modalRef.content.existeModalForm = true;
    modalRef.content.existeBotaoEditar = true;
  }

  detalhesAtividadeModal(id_atividade){
    let conjuntoDadosTable;
    this.service.getConsultar('atividade_usuario_empresa', this.parametrosConsulta + 'id_atividade=' + id_atividade + '&').subscribe((obj) => {
      conjuntoDadosTable = obj.body.data.dados;
      const initialState = {
        config: this.configAtividade,
        url: this.urlAtividade,
        id: id_atividade,
        traducoes: this.traducoes,
        configTable: this.configFuncionario,
        traducoesTable: this.traducoesFuncionario,
        conjuntoDadosTable: conjuntoDadosTable
      };
      const modalRef = this.modalService.show(ModalComponent, {initialState});
      modalRef.content.titulo = 'Detalhes da ' + this.tituloAtividade;
      modalRef.content.existeModalDetalhes = true;
      modalRef.content.existeBotaoDetalhes = true;
      modalRef.content.existeBotaoCancelar = false;
      modalRef.content.existeModalTable = true;
    });
  }

  atividadeVinculaFuncionario(id_atividade){
    let relacoes = {id_atividade: id_atividade};
    const initialState = {
      config: this.configAtividadeFuncionario,
      url: this.urlFuncionario,
      dadosRelacao: relacoes,
      traducoes: this.traducoesFuncionario
    };
    const modalRef = this.modalService.show(ModalComponent, {initialState});
    modalRef.content.titulo = 'Vincular Funcionário à Atividade'
    modalRef.content.existeModalForm = true;
    modalRef.content.existeBotaoCriar = true;
  }

  traduzir(rotulo){
    let idioma = 'br';
    let tituloConfig;
    this.translate.use(idioma);
    switch (rotulo) {
      case 'quadro':
        tituloConfig = this.configAtividade.titulo;
        break;
      case 'funcionario':
        tituloConfig = this.configAtividadeFuncionario.titulo;
        break;
    }
    return this.translate.get(tituloConfig);
  }
}