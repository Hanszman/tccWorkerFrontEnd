import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
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
  objetoFormGroup: any;
  registro: any = {};
  traducoes;

  constructor(
    private formBuilder: FormBuilder,
    private service: FormService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.objetoFormGroup = this.formBuilder.group({});
    this.traduzir().subscribe((traducoes) => {
      this.traducoes = traducoes;
    })
  }

  enviar(){

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
