import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

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
  registro: any = {};
  traducoes;

  constructor(
    public modalRef: BsModalRef
  ) { }

  ngOnInit(): void {
  }

  tradutor(chave){
    if (this.traducoes !== undefined){
      if (chave in this.traducoes)
        return this.traducoes[chave];
      return '';
    }
  }

  enviar(){

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
