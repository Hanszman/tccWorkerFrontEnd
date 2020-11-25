import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado: boolean = false;

  constructor(
    private router: Router
  ) { }

  fazerAuth(usuario: any){
    if(usuario.dsc_login === 'usuario@email.com' && usuario.dsc_senha === '123456'){
      this.usuarioAutenticado = true;
      this.router.navigate(['/']);
    }
    else
      this.usuarioAutenticado = false;
  }
}
