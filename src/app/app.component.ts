import { Component } from '@angular/core';
import { AuthService } from './componentes/login/auth.service';
import { EmpresaAuthService } from './componentes/empresa/empresa-servicos/empresa-auth.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'tccWorkerFrontEnd';
  webURL = environment.webURL;
  atualURL = window.location.href.toString().replace(this.webURL, '');
  mostrarMenu: boolean = false;
  mostrarOpcoes: boolean = false;
  id_usuario = window.localStorage.getItem('id_usuario');
  dsc_nome = window.localStorage.getItem('dsc_nome');

  constructor(
    private authService: AuthService,
    private empresaAuth: EmpresaAuthService
  ) {}

  ngOnInit(){
    this.authService.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    );
    if(!this.mostrarMenu){
      if(window.localStorage.getItem('token') !== null && this.atualURL !== 'login' && this.atualURL !== 'usuario/create') {
        this.mostrarMenu = true;
      }
    }
    
    this.empresaAuth.mostrarOpcoesEmitter.subscribe(
      mostrar => this.mostrarOpcoes = mostrar
    );
    if(!this.mostrarOpcoes && this.mostrarMenu){
      if(window.localStorage.getItem('token_empresa') && this.atualURL !== 'empresa/read')
        this.mostrarOpcoes = true;
    }
  }

  fazerLogout(){
    window.localStorage.clear();
    this.mostrarMenu = false;
  }
}
