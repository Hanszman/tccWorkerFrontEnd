import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
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
  @Input() voltaId = false;
  @Input() existeFoto = false;
  @Input() fotoUrl;
  registro: any = {};
  traducoes;
  voltarLink = "../read";
  classeBotoes = "col-sm-6";
  padraoFotoURL;
  id_usuario_logado = window.localStorage.getItem('id_usuario');
  apiURL = environment.apiURL;

  constructor(
    private router: Router,
    private service: FormService,
    private translate: TranslateService,
    private validate: ValidateService
  ) { }

  ngOnInit(): void {
    this.traduzir().subscribe((traducoes) => {
      this.traducoes = traducoes;
    })
    this.padraoFotoURL = this.fotoUrl;
    if (this.id) {
      if (this.voltaId)
        this.voltarLink = "../../read/" + this.id;
      else
        this.voltarLink = "../../read";
      this.classeBotoes = "col-sm-4"
      this.service.getConsultar(this.url + '/read', this.id).subscribe(resp => {
        for(let i = 0; i < this.config.cabecalhos.length; i++) {
          if (this.config.cabecalhos[i] == 'arq_foto' && this.existeFoto) {
            if (resp.body['data'][0][this.config.cabecalhos[i]] !== null) {
              this.fotoUrl = this.apiURL + resp.body['data'][0][this.config.cabecalhos[i]];
              this.registro['old_arq_foto'] = resp.body['data'][0][this.config.cabecalhos[i]];
            }
            else
              this.fotoUrl = this.padraoFotoURL;
          }
          else
            this.registro[this.config.cabecalhos[i]] = resp.body['data'][0][this.config.cabecalhos[i]];
        }
      });
    }
  }

  enviar(){
    for (let i = 0; i < this.config.obrigatorios.length; i++)
      this.validate.validaCampo(this.registro[this.config.obrigatorios[i]], this.config.obrigatorios[i], 'Informe ' + this.tradutor(this.config.obrigatorios[i]) + '!');

    for (let i = 0; i < this.config.obrigatorios.length; i++) {
      if (this.registro[this.config.obrigatorios[i]] == undefined || this.registro[this.config.obrigatorios[i]] == '')
        return false;
    }
    this.registro['id_usuario_logado'] = this.id_usuario_logado;
    if (!this.id) {
      this.service.postCadastrar(this.url + '/create', this.registro).subscribe(resp => {
        this.verificarResposta(resp);
      });
    }
    else {
      this.service.putEditar(this.url + '/update', this.id, this.registro).subscribe(resp => {
        this.verificarResposta(resp);
      });
    }
  }

  deletar(){
    this.service.delete(this.url + '/delete', this.id).subscribe(resp => {
      this.verificarResposta(resp);
    });
  }

  verificarResposta(resp){
    if (resp.body['data']['sucesso']){
      alert(resp.body['data']['mensagem']);
      this.router.navigate([this.url + '/read']);
    }
    else {
      alert(resp.body['data']['mensagem']);
    }
  }

  carregarArquivo(event){
    this.registro['old_arq_foto'] = undefined;
    if (event.target.files.length > 0) {
      let campoArquivo = event.target;
      const leitor = new FileReader();
      const arquivo = campoArquivo.files[0];
      leitor.readAsDataURL(arquivo);
      leitor.onload = () => {
        const dataUrl = leitor.result;
        this.fotoUrl = dataUrl;
        this.registro['dados_arq_foto'] = {
          nome_arquivo: arquivo.name,
          imagem_base64: leitor.result.toString().split(',')[1]
        }
      }
    }
    else {
      this.fotoUrl = this.padraoFotoURL;
      this.registro['dados_arq_foto'] = undefined;
      this.registro['arq_foto'] = undefined;
    }
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
