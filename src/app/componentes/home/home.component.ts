import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  id_usuario = window.localStorage.getItem('id_usuario')
  dsc_nome = window.localStorage.getItem('dsc_nome')

  constructor() { }

  ngOnInit(): void {
  }

}
