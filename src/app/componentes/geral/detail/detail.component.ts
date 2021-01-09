import { Component, OnInit, Input } from '@angular/core';
import { DetailService } from './detail.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  @Input() config;
  @Input() url: string;
  @Input() id;
  @Input() existeFoto = false;
  conjuntoDados;
  traducoes;

  constructor(
    private service: DetailService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.consultar();
    this.traduzir().subscribe((traducoes) => {
      this.traducoes = traducoes;
    })
  }

  consultar(){
    this.service.getDetail(this.url, this.id).subscribe((obj) => {
      this.mapearDados(obj.body);
    });
  }

  mapearDados(obj){
    if (obj.data) {
      this.conjuntoDados = [];
      obj.data.forEach(elemento => {
        this.config.cabecalhos.forEach(item => {
          if (!(item in elemento))
            throw "Formato incorreto de dados";
        });
        this.conjuntoDados.push(elemento);
      });
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
}
