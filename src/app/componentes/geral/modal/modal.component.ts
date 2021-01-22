import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() titulo: string;
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
  }

  clicaBotaoCriar(){
    this.emiteClicaBotaoCriar.emit();
  }

  clicaBotaoEditar(){
    this.emiteClicaBotaoEditar.emit();
  }

  clicaBotaoExcluir(){
    this.emiteClicaBotaoExcluir.emit();
  }

  cancelar(){
    this.modalRef.hide();
  }
}
