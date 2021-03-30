import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../geral/http/http.service';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../../geral/modal/modal.component';

@Component({
  selector: 'app-fornecedor-detail',
  templateUrl: './fornecedor-detail.component.html',
  styleUrls: ['./fornecedor-detail.component.css']
})
export class FornecedorDetailComponent implements OnInit {

  id;
  url = 'fornecedor';
  urlTelefone = 'telefone';
  urlEndereco = 'endereco';
  urlEmail = 'email';
  urlProjeto = 'projeto_fornecedor';
  titulo = 'Fornecedor';
  tituloTelefone = 'Telefone';
  tituloEndereco = 'Endereço';
  tituloEmail = 'E-mail';
  tituloProjeto = 'Projeto';
  relacoes;
  parametros;
  parametrosConsulta;
  traducoesProjeto;
  id_empresa = window.localStorage.getItem('id_empresa');
  ind_controle_acesso = window.localStorage.getItem('ind_controle_acesso');
  existemBotoes = false;
  @Input() config = {
    titulo: 'fornecedor',
    cabecalhos: [
      'dsc_nome',
      'dsc_cnpj'
    ]
  };
  @Input() configTelefone = {
    titulo: 'telefone',
    cabecalhos: [
      'ind_tipo',
      'dsc_telefone'
    ],
    tipos: [
      'select',
      'text'
    ],
    selects: {
      ind_tipo: {
        values: ['F', 'C', 'R', 'T', 'O'],
        labels: ['Fixo', 'Celular', 'Residencial', 'Trabalho', 'Outro']
      }
    },
    mascaras: [],
    obrigatorios: [
      'ind_tipo',
      'dsc_telefone'
    ],
    desabilitados: [],
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
    tipos: [
      'text',
      'number',
      'text',
      'text',
      'select',
    ],
    selects: {
      dsc_uf: {
        values: ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'],
        labels: ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']
      }
    },
    mascaras: [],
    obrigatorios: [
      'dsc_logradouro',
      'dsc_numero'
    ],
    desabilitados: [],
    paginacao: 5
  };
  @Input() configEmail = {
    titulo: 'email',
    cabecalhos: [
      'dsc_email'
    ],
    tipos: [
      'text'
    ],
    mascaras: [],
    obrigatorios: [
      'dsc_email'
    ],
    desabilitados: [],
    paginacao: 5
  };
  @Input() configProjeto = {
    titulo: 'projeto_fornecedor',
    cabecalhos: [
      'dsc_nome_projeto',
      'dat_inicio_projeto',
      'dat_fim_projeto',
      'dsc_setor_projeto'
    ],
    links: {
      detail: true,
      dsc_setor_projeto: {
        id: 'id_setor_projeto',
        rota: 'setor'
      }
    },
    paginacao: 5
  };
  @Input() configProjetoFornecedor = {
    titulo: 'projeto_fornecedor',
    cabecalhos: [
      'id_projeto'
    ],
    tipos: [
      'select'
    ],
    selects: {
      id_projeto: {
        values: [],
        labels: []
      }
    },
    mascaras: [],
    obrigatorios: [
      'id_projeto'
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
    this.relacoes = {id_fornecedor: this.id};
    this.parametros = 'id_fornecedor=' + this.id + '&';
    this.parametrosConsulta = 'id_empresa=' + this.id_empresa + '&';
    this.service.getConsultar('projeto', this.parametrosConsulta).subscribe((obj) => {
      let conjunto = obj.body.data.dados;
      for (let i = 0; i < conjunto.length; i++) {
        this.configProjetoFornecedor.selects.id_projeto.values.push(conjunto[i]['id_projeto']);
        this.configProjetoFornecedor.selects.id_projeto.labels.push(conjunto[i]['dsc_nome']);
      }
    });
    if (this.ind_controle_acesso != 'C')
      this.existemBotoes = true;
  }

  ngOnInit(): void {
    this.traduzir('projeto').subscribe((traducoesProjeto) => {
      this.traducoesProjeto = traducoesProjeto;
    })
  }

  emiteClicaBotaoCriarEspecialProjeto(){
    const initialState = {
      config: this.configProjetoFornecedor,
      url: this.urlProjeto,
      dadosRelacao: this.relacoes,
      traducoes: this.traducoesProjeto
    };
    const modalRef = this.modalService.show(ModalComponent, {initialState});
    modalRef.content.titulo = 'Vincular Fornecedor ao Projeto'
    modalRef.content.existeModalForm = true;
    modalRef.content.existeBotaoCriar = true;
  }

  emiteClicaBotaoDetalhesEspecialProjeto(linha){
    window.scrollTo(0,0);
    this.router.navigate(['projeto/read/' + linha.id_projeto]);
  }

  emiteClicaBotaoExcluirEspecialProjeto(linha){
    const modalRef = this.modalService.show(ModalComponent);
    modalRef.content.titulo = 'Desvincular Fornecedor do Projeto';
    modalRef.content.mensagem = 'Tem certeza que deseja desvincular esse fornecedor do projeto?';
    modalRef.content.existeMensagem = true;
    modalRef.content.existeBotaoExcluir = true;
    modalRef.content.emiteClicaBotaoExcluir.subscribe(() => {
      this.service.deleteExcluir(this.urlProjeto + '/delete', linha['id_' + this.urlProjeto]).subscribe(resp => {
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
      case 'projeto':
        tituloConfig = this.configProjetoFornecedor.titulo;
        break;
    }
    return this.translate.get(tituloConfig);
  }
}