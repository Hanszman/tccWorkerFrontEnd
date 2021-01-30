import { Component, OnInit, Input } from '@angular/core';
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
  url = 'usuario';
  urlFuncionario = 'usuario_empresa';
  urlTelefone = 'telefone';
  urlEndereco = 'endereco';
  urlEmail = 'email';
  titulo = 'Usuário';
  tituloTelefone = 'Telefone';
  tituloEndereco = 'Endereço';
  tituloEmail = 'E-mail';
  parametros;
  parametrosRelacionados;
  traducoes;
  usuarioDetailField = false;
  fotoUrl = 'assets/images/user_icon.png'
  id_empresa = window.localStorage.getItem('id_empresa');
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
      'dsc_cargo',
      'dsc_setor',
      'ind_contratacao',
      'ind_controle_acesso',
      'ind_status'
    ],
    paginacao: 5
  };
  @Input() configFuncionario = {
    titulo: 'usuario_empresa',
    cabecalhos: [
      'ind_controle_acesso',
      'dsc_cargo',
      'id_setor',
      'ind_contratacao',
      'dat_contratacao',
      'ind_status'
    ],
    tipos: [
      'select',
      'text',
      'select',
      'select',
      'date',
      'select'
    ],
    selects: {
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
    },
    mascaras: [],
    obrigatorios: [
      'ind_controle_acesso',
      'dsc_cargo',
      'ind_contratacao',
      'ind_status'
    ],
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

  constructor(
    private service: HttpService,
    private translate: TranslateService,
    private modalService: BsModalService
  ) {
    this.parametros = 'id_empresa=' + this.id_empresa + '&';
    this.service.getConsultar('setor', this.parametros).subscribe((obj) => {
      let conjunto = obj.body.data.dados;
      for (let i = 0; i < conjunto.length; i++) {
        this.configFuncionario.selects.id_setor.values.push(conjunto[i]['id_setor']);
        this.configFuncionario.selects.id_setor.labels.push(conjunto[i]['dsc_setor']);
      }
    });
  }

  ngOnInit(): void {
    this.traduzir().subscribe((traducoes) => {
      this.traducoes = traducoes;
    })
  }

  emiteClicaBotaoCriarEspecial(){
    console.log('linha');
  }

  emiteClicaBotaoDetalhesEspecial(linha){
    if (this.id == undefined) {
      this.id = linha.id_usuario;
      this.parametrosRelacionados = 'id_usuario=' + this.id + '&';
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
      config: this.configFuncionario,
      url: this.urlFuncionario,
      id: linha['id_' + this.urlFuncionario],
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
  }

  traduzir(){
    let idioma = 'br';
    this.translate.use(idioma);
    return this.translate.get(this.config.titulo);
  }
}