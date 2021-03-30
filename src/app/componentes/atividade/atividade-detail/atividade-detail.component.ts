import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../geral/http/http.service';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../../geral/modal/modal.component';

@Component({
  selector: 'app-atividade-detail',
  templateUrl: './atividade-detail.component.html',
  styleUrls: ['./atividade-detail.component.css']
})
export class AtividadeDetailComponent implements OnInit {

  id;
  url = 'atividade';
  urlFuncionario = 'atividade_usuario_empresa';
  titulo = 'Atividade';
  tituloFuncionario = 'Funcionário';
  relacoes;
  parametros;
  parametrosConsulta;
  traducoesFuncionario;
  id_empresa = window.localStorage.getItem('id_empresa');
  ind_controle_acesso = window.localStorage.getItem('ind_controle_acesso');
  existemBotoes = false;
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
    links: {
      detail: true,
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
  };
  @Input() configFuncionario = {
    titulo: 'atividade_usuario_empresa',
    cabecalhos: [
      'dsc_nome_completo_usuario_empresa',
      'dsc_login_usuario_empresa',
      'dsc_cargo_usuario_empresa'
    ],
    paginacao: 5
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HttpService,
    private translate: TranslateService,
    private modalService: BsModalService
  ) {
    this.route.params.subscribe(params => this.id = params['id']);
    this.relacoes = {id_atividade: this.id};
    this.parametros = 'id_atividade=' + this.id + '&';
    this.parametrosConsulta = 'id_empresa=' + this.id_empresa + '&';
    this.service.getConsultar('usuario', this.parametrosConsulta).subscribe((obj) => {
      let conjunto = obj.body.data.dados;
      for (let i = 0; i < conjunto.length; i++) {
        this.configAtividadeFuncionario.selects.id_usuario_empresa.values.push(conjunto[i]['id_usuario_empresa']);
        this.configAtividadeFuncionario.selects.id_usuario_empresa.labels.push(conjunto[i]['dsc_nome_completo']);
      }
    });
    if (this.ind_controle_acesso != 'C')
      this.existemBotoes = true;
  }

  ngOnInit(): void {
    this.traduzir('funcionario').subscribe((traducoesFuncionario) => {
      this.traducoesFuncionario = traducoesFuncionario;
    })
  }

  emiteClicaBotaoCriarEspecialFuncionario(){
    const initialState = {
      config: this.configAtividadeFuncionario,
      url: this.urlFuncionario,
      dadosRelacao: this.relacoes,
      traducoes: this.traducoesFuncionario
    };
    const modalRef = this.modalService.show(ModalComponent, {initialState});
    modalRef.content.titulo = 'Vincular Funcionário à Atividade'
    modalRef.content.existeModalForm = true;
    modalRef.content.existeBotaoCriar = true;
  }

  emiteClicaBotaoDetalhesEspecialFuncionario(linha){
    window.scrollTo(0,0);
    this.router.navigate(['usuario/read/'], {queryParams: {id_funcionario_parametro: linha.id_usuario}});
  }

  emiteClicaBotaoExcluirEspecialFuncionario(linha){
    const modalRef = this.modalService.show(ModalComponent);
    modalRef.content.titulo = 'Desvincular Funcionário da Atividade';
    modalRef.content.mensagem = 'Tem certeza que deseja desvincular esse funcionário da atividade?';
    modalRef.content.existeMensagem = true;
    modalRef.content.existeBotaoExcluir = true;
    modalRef.content.emiteClicaBotaoExcluir.subscribe(() => {
      this.service.deleteExcluir(this.urlFuncionario + '/delete', linha['id_' + this.urlFuncionario]).subscribe(resp => {
        this.verificarResposta(resp);
      });
    });
  }

  verificarResposta(resp){
    if (resp.body['data']['sucesso']){
      alert(resp.body['data']['mensagem']);
      window.location.reload();
    }
    else
      alert(resp.body['data']['mensagem']);
  }

  traduzir(rotulo){
    let idioma = 'br';
    let tituloConfig;
    this.translate.use(idioma);
    switch (rotulo) {
      case 'funcionario':
        tituloConfig = this.configAtividadeFuncionario.titulo;
        break;
    }
    return this.translate.get(tituloConfig);
  }
}