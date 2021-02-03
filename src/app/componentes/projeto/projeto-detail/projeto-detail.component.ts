import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../geral/http/http.service';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../../geral/modal/modal.component';

@Component({
  selector: 'app-projeto-detail',
  templateUrl: './projeto-detail.component.html',
  styleUrls: ['./projeto-detail.component.css']
})
export class ProjetoDetailComponent implements OnInit {

  id;
  url = 'projeto';
  urlQuadro = 'quadro';
  urlCliente = 'projeto_cliente';
  urlFornecedor = 'projeto_fornecedor';
  titulo = 'Projeto';
  tituloQuadro = 'Quadro';
  tituloCliente = 'Cliente';
  tituloFornecedor = 'Fornecedor';
  parametros;
  parametrosConsulta;
  traducoesCliente;
  traducoesFornecedor;
  id_empresa = window.localStorage.getItem('id_empresa');
  @Input() config = {
    titulo: 'projeto',
    cabecalhos: [
      'dsc_nome',
      'dsc_descricao',
      'dat_inicio',
      'dat_fim',
      'dsc_setor'
    ]
  };
  @Input() configQuadro = {
    titulo: 'quadro',
    cabecalhos: [
      'dsc_nome',
      'dsc_descricao',
      'dat_inicio',
      'dat_fim'
    ],
    paginacao: 5
  };
  @Input() configCliente = {
    titulo: 'projeto_cliente',
    cabecalhos: [
      'dsc_nome_cliente',
      'dsc_cnpj_cliente'
    ],
    paginacao: 5
  };
  @Input() configProjetoCliente = {
    titulo: 'projeto_cliente',
    cabecalhos: [
      'id_cliente'
    ],
    tipos: [
      'select'
    ],
    selects: {
      id_cliente: {
        values: [],
        labels: []
      }
    },
    mascaras: [],
    obrigatorios: [
      'id_cliente'
    ],
    desabilitados: []
  }
  @Input() configFornecedor = {
    titulo: 'projeto_fornecedor',
    cabecalhos: [
      'dsc_nome_fornecedor',
      'dsc_cnpj_fornecedor'
    ],
    paginacao: 5
  };
  @Input() configProjetoFornecedor = {
    titulo: 'projeto_fornecedor',
    cabecalhos: [
      'id_fornecedor'
    ],
    tipos: [
      'select'
    ],
    selects: {
      id_fornecedor: {
        values: [],
        labels: []
      }
    },
    mascaras: [],
    obrigatorios: [
      'id_fornecedor'
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
    this.parametros = 'id_projeto=' + this.id + '&';
    this.parametrosConsulta = 'id_empresa=' + this.id_empresa + '&';
    this.service.getConsultar('cliente', this.parametrosConsulta).subscribe((obj) => {
      let conjunto = obj.body.data.dados;
      for (let i = 0; i < conjunto.length; i++) {
        this.configProjetoCliente.selects.id_cliente.values.push(conjunto[i]['id_cliente']);
        this.configProjetoCliente.selects.id_cliente.labels.push(conjunto[i]['dsc_nome']);
      }
    });
    this.service.getConsultar('fornecedor', this.parametrosConsulta).subscribe((obj) => {
      let conjunto = obj.body.data.dados;
      for (let i = 0; i < conjunto.length; i++) {
        this.configProjetoFornecedor.selects.id_fornecedor.values.push(conjunto[i]['id_fornecedor']);
        this.configProjetoFornecedor.selects.id_fornecedor.labels.push(conjunto[i]['dsc_nome']);
      }
    });
  }

  ngOnInit(): void {
    this.traduzir('cliente').subscribe((traducoesCliente) => {
      this.traducoesCliente = traducoesCliente;
    })
    this.traduzir('fornecedor').subscribe((traducoesFornecedor) => {
      this.traducoesFornecedor = traducoesFornecedor;
    })
  }

  emiteClicaBotaoCriarEspecialCliente(){
    var relacoes = {
      id_projeto: this.id
    }
    const initialState = {
      config: this.configProjetoCliente,
      url: this.urlCliente,
      dadosRelacao: relacoes,
      traducoes: this.traducoesCliente
    };
    const modalRef = this.modalService.show(ModalComponent, {initialState});
    modalRef.content.titulo = 'Vincular Cliente ao Projeto'
    modalRef.content.existeModalForm = true;
    modalRef.content.existeBotaoCriar = true;
  }

  emiteClicaBotaoDetalhesEspecialCliente(linha){
    this.router.navigate(['cliente/read/' + linha.id_cliente]);
  }

  emiteClicaBotaoExcluirEspecialCliente(linha){
    const modalRef = this.modalService.show(ModalComponent);
    modalRef.content.titulo = 'Desvincular Cliente do Projeto';
    modalRef.content.mensagem = 'Tem certeza que deseja desvincular esse cliente do projeto?';
    modalRef.content.existeMensagem = true;
    modalRef.content.existeBotaoExcluir = true;
    modalRef.content.emiteClicaBotaoExcluir.subscribe(() => {
      this.service.deleteExcluir(this.urlCliente + '/delete', linha['id_' + this.urlCliente]).subscribe(resp => {
        this.verificarResposta(resp);
      });
    });
  }

  emiteClicaBotaoCriarEspecialFornecedor(){
    var relacoes = {
      id_projeto: this.id
    }
    const initialState = {
      config: this.configProjetoFornecedor,
      url: this.urlFornecedor,
      dadosRelacao: relacoes,
      traducoes: this.traducoesFornecedor
    };
    const modalRef = this.modalService.show(ModalComponent, {initialState});
    modalRef.content.titulo = 'Vincular Fornecedor ao Projeto'
    modalRef.content.existeModalForm = true;
    modalRef.content.existeBotaoCriar = true;
  }

  emiteClicaBotaoDetalhesEspecialFornecedor(linha){
    this.router.navigate(['fornecedor/read/' + linha.id_fornecedor]);
  }

  emiteClicaBotaoExcluirEspecialFornecedor(linha){
    const modalRef = this.modalService.show(ModalComponent);
    modalRef.content.titulo = 'Desvincular Fornecedor do Projeto';
    modalRef.content.mensagem = 'Tem certeza que deseja desvincular esse fornecedor do projeto?';
    modalRef.content.existeMensagem = true;
    modalRef.content.existeBotaoExcluir = true;
    modalRef.content.emiteClicaBotaoExcluir.subscribe(() => {
      this.service.deleteExcluir(this.urlFornecedor + '/delete', linha['id_' + this.urlFornecedor]).subscribe(resp => {
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
      case 'cliente':
        tituloConfig = this.configProjetoCliente.titulo;
        break;
      case 'fornecedor':
        tituloConfig = this.configProjetoFornecedor.titulo;
        break;
    }
    return this.translate.get(tituloConfig);
  }
}