import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TableService } from './table.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() config;
  @Input() url: string;
  @Input() parametros: string = '';
  @Input() existeFiltros = true;
  @Input() existeBotaoCriar = true;
  @Input() existeDetalhes = true;
  @Input() existeContagem = true;
  @Output() selecionaLinha = new EventEmitter();
  @Output() clicaBotaoCriar = new EventEmitter();
  private conjuntoDados;
  private traducoes;
  private paginador;
  private paginaAtual;
  private totalRegistros = 0;
  private removePaginacao = false;
  private ordem = '';
  private cabecalhoAnterior = '';
  private jsonFiltro = {};

  constructor(
    private service: TableService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.consultar(1);
    this.traduzir().subscribe((traducoes) => {
      this.traducoes = traducoes;
    })
  }

  consultar(pagina){
    var url = this.url + '?pagina=' + pagina + '&paginacao=' + this.config.paginacao;
    var filtro = this.parametros + this.ordem + Object.entries(this.jsonFiltro).map(e => e.join('=')).join('&');
    this.service.getTable(url, filtro).subscribe((data) => {
      this.mapearDados(data.body);
    });
  }

  mapearDados(dados){
    if (dados !== undefined) {
      if ('data' in dados['data']) {
        this.conjuntoDados = [];
      }
      else
        throw "Objeto não contém dados";
    }
    else
      throw "Dados não recebidos";
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

  ordenarCabecalho(cabecalho){
    console.log('ordem');
  }

  emiteSelecionaLinha(linha) {
    this.selecionaLinha.emit(linha);
  }

  emiteClicaBotaoCriar() {
    this.clicaBotaoCriar.emit();
  }
}