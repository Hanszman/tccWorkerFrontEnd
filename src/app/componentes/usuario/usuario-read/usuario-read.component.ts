import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-usuario-read',
  templateUrl: './usuario-read.component.html',
  styleUrls: ['./usuario-read.component.css']
})
export class UsuarioReadComponent implements OnInit {

  url = 'usuario';
  titulo = 'Usuário';
  parametros;
  listaDetalhes;
  id_empresa = window.localStorage.getItem('id_empresa');
  @Input() config = {
    titulo: 'usuario',
    cabecalhos: [
      'dsc_nome_completo',
      'dsc_cargo',
      'dsc_login',
      'ind_controle_acesso',
      'ind_status'
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
    console.log(linha);
  }

  emiteClicaBotaoEditarEspecial(linha){
    console.log('teste');
  }

  emiteClicaBotaoExcluirEspecial(linha){
    console.log('teste');
  }
}