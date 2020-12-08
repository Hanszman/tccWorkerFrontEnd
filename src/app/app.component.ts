import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './componentes/login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tccWorkerFrontEnd';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(){
    
  }

  fazerLogout(){
    window.localStorage.clear();
  }
}
