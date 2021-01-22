import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private apiURL = environment.apiURL;

  constructor(private http: HttpClient) { }

  getConsultar(url, id): Observable<HttpResponse<any>> {
    return this.http.get<any>(
      this.apiURL + url + `/${id}?isForm=1`, {observe: 'response'}
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
