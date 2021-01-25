import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../http/http.service';
import { ValidateService } from '../../geral/validate/validate.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() titulo: string;
  @Input() existeModalForm = false;
  @Input() existeBotaoCriar = false;
  @Input() existeBotaoEditar = false;
  @Input() existeBotaoExcluir = false;
  @Input() existeMensagem = false;
  @Input() mensagem: string;
  @Output() emiteClicaBotaoCriar = new EventEmitter();
  @Output() emiteClicaBotaoEditar = new EventEmitter();
  @Output() emiteClicaBotaoExcluir = new EventEmitter();
  config;
  url: string;
  id;
  idRelacao;
  relacao;
  traducoes;
  registro: any = {};

  constructor(
    public modalRef: BsModalRef,
    private service: HttpService,
    private validate: ValidateService
  ) { }

  ngOnInit(): void {
    if (this.id) {
      this.service.getConsultarForm(this.url + '/read', this.id).subscribe(resp => {
        for(let i = 0; i < this.config.cabecalhos.length; i++)
          this.registro[this.config.cabecalhos[i]] = resp.body['data'][0][this.config.cabecalhos[i]];
      });
    }
  }

  tradutor(chave){
    if (this.traducoes !== undefined){
      if (chave in this.traducoes)
        return this.traducoes[chave];
      return '';
    }
  }

  verificarResposta(resp){
    if (resp.body['data']['sucesso']){
      alert(resp.body['data']['mensagem']);
      window.location.reload();
    }
    else
      alert(resp.body['data']['mensagem']);
  }

  enviar(){
    for (let i = 0; i < this.config.obrigatorios.length; i++)
      this.validate.validaCampo(this.registro[this.config.obrigatorios[i]], this.config.obrigatorios[i], 'Informe ' + this.tradutor(this.config.obrigatorios[i]) + '!');
    
    for (let i = 0; i < this.config.obrigatorios.length; i++) {
      if (this.registro[this.config.obrigatorios[i]] == undefined || this.registro[this.config.obrigatorios[i]] == '' || this.registro[this.config.obrigatorios[i]] == 'undefined')
        return false;
    }
    this.registro['id_' + this.relacao] = this.idRelacao;

    if (!this.id && this.existeBotaoCriar) {
      this.service.postCadastrar(this.url + '/create', this.registro).subscribe(resp => {
        this.verificarResposta(resp);
      });
    }
    else if (this.id && this.existeBotaoEditar) {
      this.service.putEditar(this.url + '/update', this.id, this.registro).subscribe(resp => {
        this.verificarResposta(resp);
      });
    }
    this.modalRef.hide();
  }

  clicaBotaoCriar(){
    this.emiteClicaBotaoCriar.emit();
    this.modalRef.hide();
  }

  clicaBotaoEditar(){
    this.emiteClicaBotaoEditar.emit();
    this.modalRef.hide();
  }

  clicaBotaoExcluir(){
    this.emiteClicaBotaoExcluir.emit();
    this.modalRef.hide();
  }

  cancelar(){
    this.modalRef.hide();
  }
}
