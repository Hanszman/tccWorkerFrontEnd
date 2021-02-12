import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiURL = environment.apiURL;

  constructor(private http: HttpClient) { }

  getChart(url): Observable<HttpResponse<any>> {
    return this.http.get<any>(
      this.apiURL + url, {observe: 'response'}
    );
  }

  getTable(url, filtro): Observable<HttpResponse<any>> {
    return this.http.get<any>(
      this.apiURL + url + `&${filtro}`, {observe: 'response'}
    );
  }

  getDetail(url, id, parametros = ''): Observable<HttpResponse<any>> {
    return this.http.get<any>(
      this.apiURL + url + `/${id}?` + parametros, {observe: 'response'}
    );
  }

  getConsultar(url, parametros): Observable<HttpResponse<any>> {
    return this.http.get<any>(
      this.apiURL + url + '/read?' + parametros, {observe: 'response'}
    );
  }

  getConsultarForm(url, id, parametros = ''): Observable<HttpResponse<any>> {
    return this.http.get<any>(
      this.apiURL + url + `/${id}?isForm=1&` + parametros, {observe: 'response'}
    );
  }

  postCadastrar(url, dados): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      this.apiURL + url, dados, {observe: 'response'}
    );
  }

  putEditar(url, id, dados): Observable<HttpResponse<any>> {
    return this.http.put<any>(
      this.apiURL + url + `/${id}`, dados, {observe: 'response'}
    );
  }

  deleteExcluir(url, id): Observable<HttpResponse<any>> {
    return this.http.delete<any>(
      this.apiURL + url + `/${id}`, {observe: 'response'}
    );
  }
}