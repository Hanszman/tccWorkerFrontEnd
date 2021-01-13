import { Component, OnInit, Input } from '@angular/core';
import { FormService } from './form.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() config;
  @Input() url: string;
  @Input() id;
  @Input() operacao;
  registro: any = {};
  traducoes;

  constructor(
    private service: FormService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.traduzir().subscribe((traducoes) => {
      this.traducoes = traducoes;
    })
  }

  enviar(){
    console.log(this.registro)
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
