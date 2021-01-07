import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private empresaAuth: EmpresaAuthService
  ) {
    translate.setDefaultLang('br');
  }

  ngOnInit(){
    this.authService.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    );
    if(!this.mostrarMenu){
      if(this.localStorageItem('token') !== null && this.atualURL !== 'login' && this.atualURL !== 'usuario/create') {
        this.mostrarMenu = true;
      }
    }
    
    this.empresaAuth.mostrarOpcoesEmitter.subscribe(
      mostrar => this.mostrarOpcoes = mostrar
    );
    if(!this.mostrarOpcoes && this.mostrarMenu){
      if(this.localStorageItem('token_empresa') && this.atualURL !== 'empresa/read')
        this.mostrarOpcoes = true;
    }
  }

  public localStorageItem(id: string): string {
    return window.localStorage.getItem(id);
  }

  fazerLogout(){
    this.mostrarMenu = false;
    window.localStorage.clear();
  }

  trocarIdioma(idioma: string) {
    this.translate.use(idioma);
  }
}
