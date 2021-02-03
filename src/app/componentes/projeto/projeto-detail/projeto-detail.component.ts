import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  titulo = 'Projeto';
  tituloQuadro = 'Quadro';
  tituloCliente = 'Cliente';
  parametros;
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
    tipos: [
      'text',
      'text'
    ],
    selects: {},
    mascaras: [],
    obrigatorios: [
      'dsc_nome_cliente'
    ],
    desabilitados: [],
    paginacao: 5
  };

  constructor(
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => this.id = params['id']);
    this.parametros = 'id_projeto=' + this.id + '&';
  }

  ngOnInit(): void {
  }

  emiteClicaBotaoCriarEspecial(){
    console.log('teste');
  }

  emiteClicaBotaoDetalhesEspecial(linha){
    console.log('teste');
  }

  emiteClicaBotaoEditarEspecial(linha){
    console.log('teste');
  }

  emiteClicaBotaoExcluirEspecial(linha){
    console.log('teste');
  }
}