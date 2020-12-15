import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpresaAuthService {

  mostrarOpcoesEmitter = new EventEmitter<boolean>();

  constructor() { }

  verificaEmpresaAuth(verifica: boolean){
    this.mostrarOpcoesEmitter.emit(verifica);
  }
}
