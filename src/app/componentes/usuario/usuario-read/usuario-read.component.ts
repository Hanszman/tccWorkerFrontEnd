import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChartComponent } from '../../geral/chart/chart.component';
import { HttpService } from '../../geral/http/http.service';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../../geral/modal/modal.component';

@Component({
  selector: 'app-usuario-read',
  templateUrl: './usuario-read.component.html',
  styleUrls: ['./usuario-read.component.css']
})
export class UsuarioReadComponent implements OnInit {

  id;
  id_funcionario_parametro;
  url = 'usuario';
  urlFuncionario = 'usuario_empresa';
  urlTelefone = 'telefone';
  urlEndereco = 'endereco';
  urlEmail = 'email';
  urlProjeto = 'projeto_usuario_empresa';
  urlAtividade = 'atividade_usuario_empresa';
  titulo = 'Usuário';
  tituloTelefone = 'Telefone';
  tituloEndereco = 'Endereço';
  tituloEmail = 'E-mail';
  tituloProjeto = 'Projeto';
  tituloAtividade = 'Atividade';
  parametros;
  parametrosRelacionados;
  parametrosAssociados;
  traducoes;
  usuarioDetailField = false;
  fotoUrl = 'assets/images/user_icon.png'
  id_empresa = window.localStorage.getItem('id_empresa');
  chartProjetoFuncionario;
  chartAtividadeFuncionarioEtapa;
  private componenteChart = new ChartComponent();
  cabecalhosCriaFuncionario = ['id_usuario', 'ind_controle_acesso', 'dsc_cargo', 'id_setor', 'ind_contratacao', 'dat_contratacao', 'ind_status'];
  cabecalhosEditaFuncionario = ['ind_controle_acesso', 'dsc_cargo', 'id_setor', 'ind_contratacao', 'dat_contratacao', 'ind_status'];
  tiposCriaFuncionario = ['number', 'select', 'text', 'select', 'select', 'date', 'select'];
  tiposEditaFuncionario = ['select', 'text', 'select', 'select', 'date', 'select'];
  obrigatoriosCriaFuncionario = ['id_usuario', 'ind_controle_acesso', 'dsc_cargo', 'ind_contratacao', 'ind_status']
  obrigatoriosEditaFuncionario = ['ind_controle_acesso', 'dsc_cargo', 'ind_contratacao', 'ind_status']
  selectsFuncionario = {
    ind_controle_acesso: {
      values: ['C', 'A', 'G'],
      labels: ['Comum', 'Administrador', 'Gerente']
    },
    id_setor: {
      values: [],
      labels: []
    },
    ind_contratacao: {
      values: ['C', 'E', 'M'],
      labels: ['Carteira Assinada', 'Estágio', 'MEI']
    },
    ind_status: {
      values: ['A', 'D'],
      labels: ['Ativo', 'Desativado']
    },
  };
  @Input() config = {
    titulo: 'usuario',
    cabecalhos: [
      'dsc_nome_completo',
      'dsc_login',
      'dsc_cargo',
      'dsc_setor',
      'ind_controle_acesso',
      'ind_status'
    ],
    paginacao: 5
  };
  @Input() configDetail = {
    titulo: 'usuario',
    cabecalhos: [
      'id_usuario',
      'dsc_nome_completo',
      'dsc_email',
      'dsc_login',
      'dat_nascimento',
      'dsc_cpf',
      'dsc_rg',
      'ind_controle_acesso',
      'dsc_cargo',
      'dsc_setor',
      'ind_contratacao',
      'dat_contratacao',
      'ind_status'
    ],
    paginacao: 5
  };
  @Input() configCriaFuncionario = {
    titulo: 'usuario_empresa',
    cabecalhos: this.cabecalhosCriaFuncionario,
    tipos: this.tiposCriaFuncionario,
    selects: this.selectsFuncionario,
    mascaras: [],
    obrigatorios: this.obrigatoriosCriaFuncionario,
    desabilitados: []
  };
  @Input() configEditaFuncionario = {
    titulo: 'usuario_empresa',
    cabecalhos: this.cabecalhosEditaFuncionario,
    tipos: this.tiposEditaFuncionario,
    selects: this.selectsFuncionario,
    mascaras: [],
    obrigatorios: this.obrigatoriosEditaFuncionario,
    desabilitados: []
  };
  @Input() configTelefone = {
    titulo: 'telefone',
    cabecalhos: [
      'ind_tipo',
      'dsc_telefone'
    ],
    paginacao: 5
  };
  @Input() configEndereco = {
    titulo: 'endereco',
    cabecalhos: [
      'dsc_logradouro',
      'dsc_numero',
      'dsc_bairro',
      'dsc_cidade',
      'dsc_uf'
    ],
    paginacao: 5
  };
  @Input() configEmail = {
    titulo: 'email',
    cabecalhos: [
      'dsc_email'
    ],
    paginacao: 5
  };
  @Input() configProjeto = {
    titulo: 'projeto_usuario_empresa',
    cabecalhos: [
      'dsc_nome_projeto',
      'dsc_descricao_projeto',
      'dat_inicio_projeto',
      'dat_fim_projeto',
      'dsc_setor_projeto'
    ],
    paginacao: 5
  };
  @Input() configAtividade = {
    titulo: 'atividade_usuario_empresa',
    cabecalhos: [
      'dsc_nome_atividade',
      'dsc_descricao_atividade',
      'dat_inicio_atividade',
      'dat_fim_atividade',
      'ind_prioridade_atividade',
      'dsc_etapa_atividade',
      'dsc_quadro_atividade',
      'dsc_projeto_atividade'
    ],
    paginacao: 5
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HttpService,
    private translate: TranslateService,
    private modalService: BsModalService
  ) {
    this.parametros = 'id_empresa=' + this.id_empresa + '&';
    this.service.getConsultar('setor', this.parametros).subscribe((obj) => {
      let conjunto = obj.body.data.dados;
      for (let i = 0; i < conjunto.length; i++) {
        this.selectsFuncionario.id_setor.values.push(conjunto[i]['id_setor']);
        this.selectsFuncionario.id_setor.labels.push(conjunto[i]['dsc_setor']);
      }
    });
    this.route.queryParams.subscribe(params => this.id_funcionario_parametro = params['id_funcionario_parametro']);
  }

  ngOnInit(): void {
    this.traduzir().subscribe((traducoes) => {
      this.traducoes = traducoes;
    })
    if (this.id_funcionario_parametro) {
      this.service.getConsultar('usuario', this.parametros + 'id_usuario=' + this.id_funcionario_parametro + '&').subscribe((obj) => {
        let conjunto = obj.body.data.dados;
        this.parametrosAssociados = 'id_usuario_empresa=' + conjunto[0]['id_usuario_empresa'] + '&';
        this.mostrar();
      });
    }
    this.projetoFuncionarioChart();
    this.atividadeFuncionarioEtapaChart();
  }

  emiteClicaBotaoCriarEspecial(){
    var relacoes = {
      id_empresa: this.id_empresa
    }
    const initialState = {
      config: this.configCriaFuncionario,
      url: this.urlFuncionario,
      dadosRelacao: relacoes,
      traducoes: this.traducoes
    };
    const modalRef = this.modalService.show(ModalComponent, {initialState});
    modalRef.content.titulo = 'Vincular Novo Funcionário'
    modalRef.content.existeModalForm = true;
    modalRef.content.existeBotaoCriar = true;
  }

  emiteClicaBotaoDetalhesEspecial(linha){
    if (this.id == undefined) {
      this.id = linha.id_usuario;
      this.parametrosRelacionados = 'id_usuario=' + this.id + '&';
      this.parametrosAssociados = 'id_usuario_empresa=' + linha.id_usuario_empresa + '&';
      this.usuarioDetailField = true;
    }
    else
      this.ocultar();
  }

  emiteClicaBotaoEditarEspecial(linha){
    var relacoes = {
      id_empresa: linha.id_empresa,
      id_usuario: linha.id_usuario
    }
    const initialState = {
      config: this.configEditaFuncionario,
      url: this.urlFuncionario,
      idConsulta: linha['id_' + this.url],
      id: linha['id_' + this.urlFuncionario],
      parametros: this.parametros,
      dadosRelacao: relacoes,
      traducoes: this.traducoes
    };
    const modalRef = this.modalService.show(ModalComponent, {initialState});
    modalRef.content.titulo = 'Configurar Funcionário'
    modalRef.content.subtitulo = 'Nome Completo (Código):';
    modalRef.content.mensagem = linha.dsc_nome_completo + ' (' + linha.id_usuario + ')';
    modalRef.content.existeSubtitulo = true;
    modalRef.content.existeMensagem = true;
    modalRef.content.existeModalForm = true;
    modalRef.content.existeBotaoEditar = true;
  }

  emiteClicaBotaoExcluirEspecial(linha){
    const modalRef = this.modalService.show(ModalComponent);
    modalRef.content.titulo = 'Desvincular Funcionário';
    modalRef.content.mensagem = 'Tem certeza que deseja desvincular esse funcionário da empresa?';
    modalRef.content.existeMensagem = true;
    modalRef.content.existeBotaoExcluir = true;
    modalRef.content.emiteClicaBotaoExcluir.subscribe(() => {
      this.service.deleteExcluir(this.urlFuncionario + '/delete', linha['id_' + this.urlFuncionario]).subscribe(resp => {
        if (resp.body['data']['sucesso']){
          alert(resp.body['data']['mensagem']);
          window.location.reload();
        }
        else
          alert(resp.body['data']['mensagem']);
      });
    });
  }

  ocultar(){
    this.usuarioDetailField = false;
    this.id = undefined;
    this.parametrosRelacionados = undefined;
    this.parametrosAssociados = undefined;
  }

  mostrar(){
    this.usuarioDetailField = true;
    this.id = this.id_funcionario_parametro;
    this.parametrosRelacionados = 'id_usuario=' + this.id + '&';
  }

  emiteClicaBotaoDetalhesEspecialProjeto(linha){
    window.scrollTo(0,0);
    this.router.navigate(['projeto/read/' + linha.id_projeto]);
  }

  emiteClicaBotaoDetalhesEspecialAtividade(linha){
    window.scrollTo(0,0);
    this.router.navigate(['atividade/read/' + linha.id_atividade]);
  }

  traduzir(){
    let idioma = 'br';
    this.translate.use(idioma);
    return this.translate.get(this.config.titulo);
  }

  projetoFuncionarioChart(){
    var url = 'projeto_funcionario?id_empresa=' + this.id_empresa;
    this.service.getChart(url).subscribe(resp => {
      var resposta = resp.body.data;
      if (typeof(this.chartProjetoFuncionario) != "undefined")
        this.chartProjetoFuncionario.destroy();
      this.chartProjetoFuncionario = this.componenteChart.configuraChart(
        'chartProjetoFuncionario',
        'doughnut',
        resposta['tipos'],
        resposta['eixoX'],
        resposta['legendas'],
        [resposta['eixoY']],
        [this.componenteChart.selecionaCores(resposta['eixoY'].length)],
        'Quantidade de Projetos por Funcionário'
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
}