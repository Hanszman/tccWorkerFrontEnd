import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmpresaAuthGuard implements CanActivate {
  
  constructor(
    private router: Router
  ) { }
  
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token_empresa = window.localStorage.getItem('token_empresa');
    if (token_empresa)
      return true;
    else {
      this.router.navigate(['empresa/read']);
      return false;
    }
  }
}
