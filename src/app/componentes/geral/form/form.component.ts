import { Component, OnInit, Input } from '@angular/core';
import { FormService } from './form.service';
import { TranslateService } from '@ngx-translate/core';
import { ValidateService } from '../../geral/validate/validate.service';
import { environment } from '../../../../environments/environment';

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
  @Input() existeFoto = false;
  @Input() fotoUrl: string;
  registro: any = {};
  traducoes;
  voltarLink = "../read";
  classeBotoes = "col-sm-6";
  apiURL = environment.apiURL;

  constructor(
    private service: FormService,
    private translate: TranslateService,
    private validate: ValidateService
  ) { }

  ngOnInit(): void {
    this.traduzir().subscribe((traducoes) => {
      this.traducoes = traducoes;
    })
    if (this.id) {
      this.voltarLink = "../../read";
      this.classeBotoes = "col-sm-4"
    }
  }

  enviar(){
    for (let i = 0; i < this.config.obrigatorios.length; i++)
      this.validate.validaCampo(this.registro[this.config.obrigatorios[i]], this.config.obrigatorios[i], 'Informe ' + this.tradutor(this.config.obrigatorios[i]) + '!');

    for (let i = 0; i < this.config.obrigatorios.length; i++) {
      if (this.registro[this.config.obrigatorios[i]] == undefined || this.registro[this.config.obrigatorios[i]] == '')
        return false;
    }

    console.log(this.registro)
  }

  deletar(){

  }

  carregarArquivo(event){

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
