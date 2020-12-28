import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-empresa-detail',
  templateUrl: './empresa-detail.component.html',
  styleUrls: ['./empresa-detail.component.css']
})
export class EmpresaDetailComponent implements OnInit {

  apiURL = environment.apiURL;
  detalhesEmpresa: any;
  id;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.route.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit(): void {
    this.detalharEmpresa();
  }

  detalharEmpresa(){
    return this.http.get(this.apiURL + 'empresa/read/' + this.id, {
      observe: 'response'
    }).subscribe(data => {
      this.detalhesEmpresa = data.body['data'];
    });
  }
}
