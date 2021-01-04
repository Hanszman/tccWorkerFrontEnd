import { Component, OnInit, Input } from '@angular/core';
import { TableService } from './table.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'] //'../../../../styles.scss'
})
export class TableComponent implements OnInit {

  @Input() config;
  @Input() url: string;
  @Input() parametros: string = '';
  private conjuntoDados;
  private traducoes;
  private ordem = '';
  private jsonFiltro = {};

  constructor(
    private service: TableService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.consulta(1);
    this.traduzir().subscribe((traducoes) => {
      this.traducoes = traducoes;
    })
  }

  consulta(pagina){
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
    return this.translate.get(this.config.titulo);
  }

  tradutor(chave) {
    if (this.traducoes !== undefined){
      if (chave in this.traducoes)
        return this.traducoes[chave];
      return '';
    }
  }
}
