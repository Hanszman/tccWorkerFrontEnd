import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrls: ['./usuario-create.component.css']
})
export class UsuarioCreateComponent implements OnInit {

  usuario: any = {};

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    window.localStorage.clear();
  }

  criarUsuario(){
    console.log('teste')
  }
}
