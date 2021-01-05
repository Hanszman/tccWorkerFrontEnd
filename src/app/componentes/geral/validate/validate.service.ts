import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validaCampo(campo, id, msg){
    var id_campo = <HTMLElement>document.getElementById(id);
    var msg_campo = <HTMLElement>document.getElementById('msg_' + id);
    
    if (campo == undefined || campo == '') {  
      id_campo.classList.add('is-invalid');
      msg_campo.classList.add('invalid-feedback');
      msg_campo.innerHTML = msg;
    }
    else {
      id_campo.classList.remove('is-invalid');
      msg_campo.classList.remove('invalid-feedback');
      msg_campo.innerHTML = '';
    }
  }
}
