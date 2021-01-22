import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() titulo: string;
  @Input() existeMensagem = false;
  @Input() mensagem: string;

  constructor(
    public modalRef: BsModalRef
  ) { }

  ngOnInit(): void {
  }

  salvar(){

  }

  cancelar(){
    this.modalRef.hide();
  }
}
