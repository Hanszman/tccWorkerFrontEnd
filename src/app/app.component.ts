import { Component } from '@angular/core';
import { AuthService } from './componentes/login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tccWorkerFrontEnd';

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(){
    
  }
}
