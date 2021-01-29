import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../geral/http/http.service';
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
  listaDetalhes;
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
  @Input() configFuncionario = {
    titulo: 'usuario',
    cabecalhos: [
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
    private modalService: BsModalService
  ) {
    this.parametros = 'id_empresa=' + this.id_empresa + '&';
  }

  ngOnInit(): void {
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
    console.log(linha);
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
}