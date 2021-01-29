import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-usuario-read',
  templateUrl: './usuario-read.component.html',
  styleUrls: ['./usuario-read.component.css']
})
export class UsuarioReadComponent implements OnInit {

  id;
  url = 'usuario';
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
  @Input() configDetail = {
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

  constructor() {
    this.parametros = 'id_empresa=' + this.id_empresa + '&';
  }

  ngOnInit(): void {
  }

  emiteClicaBotaoCriarEspecial(){
    console.log('teste');
  }

  emiteClicaBotaoDetalhesEspecial(linha){
    this.id = linha.id_usuario;
    this.parametrosRelacionados = 'id_usuario=' + this.id + '&';
    this.usuarioDetailField = true;
  }

  emiteClicaBotaoEditarEspecial(linha){
    console.log('teste');
  }

  emiteClicaBotaoExcluirEspecial(linha){
    console.log('teste');
  }

  ocultar(){
    this.usuarioDetailField = false;
  }
}