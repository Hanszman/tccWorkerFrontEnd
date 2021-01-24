import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TableService } from './table.service';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() titulo: string;
  @Input() config;
  @Input() url: string;
  @Input() parametros: string = '';
  @Input() existeFiltros = true;
  @Input() existeContagem = true;
  @Input() existeBotaoCriar = true;
  @Input() existeBotaoDetalhes = true;
  @Input() existeBotaoEditar = true;
  @Input() existeBotaoExcluir = true;
  @Input() existeModalForm = false;
  @Input() existeBotaoCriarEspecial = false;
  @Input() existeBotaoDetalhesEspecial = false;
  @Input() existeBotaoEditarEspecial = false;
  @Input() existeBotaoExcluirEspecial = false;
  @Output() emiteClicaBotaoCriarEspecial = new EventEmitter();
  @Output() emiteClicaBotaoDetalhesEspecial = new EventEmitter();
  @Output() emiteClicaBotaoEditarEspecial = new EventEmitter();
  @Output() emiteClicaBotaoExcluirEspecial = new EventEmitter();
  conjuntoDados;
  traducoes;
  paginador;
  paginaAtual;
  totalRegistros = 0;
  removePaginacao = false;
  ordem = '';
  cabecalhoAnterior = '';
  jsonFiltro = {};

  constructor(
    private router: Router,
    private service: TableService,
    private translate: TranslateService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.consultar(1);
    this.traduzir().subscribe((traducoes) => {
      this.traducoes = traducoes;
    })
  }

  consultar(pagina){
    var url = this.url + '/read?pagina=' + pagina + '&paginacao=' + this.config.paginacao;
    var filtro = this.parametros + this.ordem + Object.entries(this.jsonFiltro).map(e => e.join('=')).join('&');
    this.service.getTable(url, filtro).subscribe((obj) => {
      this.mapearDados(obj.body);
    });
  }

  mapearDados(obj){
    if (obj.data) {
      if (obj.data.dados) {
        this.conjuntoDados = [];
        this.totalRegistros = obj.data['total'];
        this.paginaAtual = obj.data['pagina_atual'];
        this.organizaPaginacao(obj.data['ultima_pagina'], obj.data['pagina_atual']);
        if (this.paginador.length == 0)
          this.removePaginacao = true;
        else
          this.removePaginacao = false;
        obj.data.dados.forEach(elemento => {
          this.config.cabecalhos.forEach(item => {
            if (!(item in elemento))
              throw "Formato incorreto de dados";
          });
          this.conjuntoDados.push(elemento);
        });
      }
      else
        throw "Conjunto de dados não está corretamente definido!"  
    }
    else
      throw "Objeto não possui conjunto de dados!"
  }

  traduzir(){
    let idioma = 'br';
    this.translate.use(idioma);
    return this.translate.get(this.config.titulo);
  }

  tradutor(chave){
    if (this.traducoes !== undefined){
      if (chave in this.traducoes)
        return this.traducoes[chave];
      return '';
    }
  }

  clicaBotaoCriar() {
    if (!this.existeModalForm)
      this.router.navigate([this.url + '/create/']);
    else {
      const initialState = {
        config: this.config,
        url: this.url
      };
      const modalRef = this.modalService.show(ModalComponent, {initialState});
      modalRef.content.titulo = 'Cadastrar ' + this.titulo;
      modalRef.content.existeModalForm = true;
      modalRef.content.existeBotaoCriar = true;
      modalRef.content.emiteClicaBotaoCriar.subscribe(() => {
        console.log('Criar modal!');
      });
    }
  }
  
  clicaBotaoDetalhes(linha) {
    this.router.navigate([this.url + '/read/', linha['id_' + this.url]]);
  }

  clicaBotaoEditar(linha) {
    if (!this.existeModalForm)
      this.router.navigate([this.url + '/update/', linha['id_' + this.url]]);
    else {
      const initialState = {
        config: this.config,
        url: this.url,
        id: linha['id_' + this.url]
      };
      const modalRef = this.modalService.show(ModalComponent, {initialState});
      modalRef.content.titulo = 'Editar ' + this.titulo;
      modalRef.content.existeModalForm = true;
      modalRef.content.existeBotaoEditar = true;
      modalRef.content.emiteClicaBotaoEditar.subscribe(() => {
        console.log('Editar modal!');
      });
    }
  }

  clicaBotaoExcluir(linha) {
    const modalRef = this.modalService.show(ModalComponent);
    modalRef.content.titulo = 'Excluir ' + this.titulo;
    modalRef.content.mensagem = 'Tem certeza que deseja excluir esse registro?';
    modalRef.content.existeMensagem = true;
    modalRef.content.existeBotaoExcluir = true;
    modalRef.content.emiteClicaBotaoExcluir.subscribe(() => {
      this.service.deleteExcluir(this.url + '/delete', linha['id_' + this.url]).subscribe(resp => {
        if (resp.body['data']['sucesso']){
          alert(resp.body['data']['mensagem']);
          window.location.reload();
        }
        else {
          alert(resp.body['data']['mensagem']);
        }
      });
    });
  }

  clicaBotaoCriarEspecial(){
    this.emiteClicaBotaoCriarEspecial.emit();
  }

  clicaBotaoDetalhesEspecial(linha){
    this.emiteClicaBotaoDetalhesEspecial.emit(linha);
  }

  clicaBotaoEditarEspecial(linha){
    this.emiteClicaBotaoEditarEspecial.emit(linha);
  }

  clicaBotaoExcluirEspecial(linha){
    this.emiteClicaBotaoExcluirEspecial.emit(linha);
  }

  ordenarCabecalho(item){
    let dir;
    let icone = document.getElementById('icone_' + item);
    let cabecalho = document.getElementsByClassName('direcao');
    for (var i = 0; i < cabecalho.length; i++) {
      cabecalho[i].classList.remove('fa');
      cabecalho[i].classList.remove('fa-arrow-up');
      cabecalho[i].classList.remove('fa-arrow-down');
    }
    if (this.cabecalhoAnterior == item) {
      dir = 'desc';
      this.cabecalhoAnterior = '';
      icone.classList.add('fa', 'fa-arrow-up');
    }
    else {
      dir = 'asc';
      this.cabecalhoAnterior = item;
      icone.classList.add('fa', 'fa-arrow-down');
    }
    this.ordem = 'ordenarPor=' + item + '&direcao=' + dir + '&';
    this.consultar(1);
  }

  organizaPaginacao(ultimaPagina, paginaAtual){
    this.paginador = [];
    if(ultimaPagina > 1){
      this.paginador.push({
        label: '<<',
        pagina: '1'
      });
      this.paginador.push({
        label: '<',
        pagina: paginaAtual > 1 ? paginaAtual - 1 : 1
      });
      const arvorePaginacao = [
        {
          paginadorBloco: (paginaAtual - 3) > 0 ? paginaAtual - 3 : 0,
          peso:4
        },
        {
          paginadorBloco: (paginaAtual - 2) > 0 ? paginaAtual - 2 : 0,
          peso:5
        },
        {
          paginadorBloco: (paginaAtual - 1) > 0 ? paginaAtual - 1 : 0,
          peso:9
        },
        {
          paginadorBloco: paginaAtual,
          peso:10
        },
        {
          paginadorBloco: (paginaAtual + 1) > ultimaPagina ? 0 : paginaAtual + 1,
          peso:8
        },
        {
          paginadorBloco: (paginaAtual + 2) > ultimaPagina ? 0 : paginaAtual + 2,
          peso:7
        },
        {
          paginadorBloco: (paginaAtual + 3) > ultimaPagina ? 0 : paginaAtual + 3,
          peso:6
        }
      ]
      let maximoPesoLista = [];
      arvorePaginacao.forEach((folha) => {
        if (folha.paginadorBloco !== 0) {
          if (maximoPesoLista.length < 4)
            maximoPesoLista.push(folha.peso);
          else {
            let listaMinima = Math.min(...maximoPesoLista);
            if(folha.peso > listaMinima){
              let indice = maximoPesoLista.indexOf(listaMinima);
              maximoPesoLista[indice] = folha.peso;
            }
          }            
        }
      });
      arvorePaginacao.forEach((folha)=>{
        if(maximoPesoLista.includes(folha.peso)){
          this.paginador.push({
            label: folha.paginadorBloco,
            pagina: folha.paginadorBloco
          });
        }         
      });
      this.paginador.push({
        label: '>',
        pagina: paginaAtual + 1 < ultimaPagina ? paginaAtual + 1 : ultimaPagina
      });
      this.paginador.push({
        label: '>>',
        pagina: ultimaPagina
      });
    }
  }
}