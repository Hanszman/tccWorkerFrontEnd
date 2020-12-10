import { Component } from '@angular/core';
import { AuthService } from './componentes/login/auth.service';
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

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(){
    this.authService.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    );
    if(!this.mostrarMenu) {
      if(window.localStorage.getItem('token') !== null && this.atualURL !== 'login' && this.atualURL !== 'usuario/create') {
        this.mostrarMenu = true;
      }
    }
  }

  fazerLogout(){
    window.localStorage.clear();
    this.mostrarMenu = false;
  }
}
