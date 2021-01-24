import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../http/http.service';

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
  traducoes;
  registro: any = {};

  constructor(
    public modalRef: BsModalRef,
    private service: HttpService
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

  enviar(){
    console.log(this.registro)
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
