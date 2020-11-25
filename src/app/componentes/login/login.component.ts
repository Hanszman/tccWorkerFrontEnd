import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: any = {};

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {

  }

  fazerLogin(){
    this.authService.fazerAuth(this.usuario);
  }
}
