import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() config;
  @Input() url: string;
  @Input() id;
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

  constructor(
    public modalRef: BsModalRef
  ) { }

  ngOnInit(): void {
    console.log(this.config)
    console.log(this.url)
    console.log(this.id)
    console.log(this.existeModalForm)
    console.log(this.existeBotaoCriar)
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
