import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  private apiURL = environment.apiURL;

  constructor(private http: HttpClient) { }

  getDetail(url, id): Observable<HttpResponse<any>> {
    return this.http.get<any>(
      this.apiURL + url + `/${id}`, {observe: 'response'}
    );
  }

  deleteExcluir(url, id): Observable<HttpResponse<any>> {
    return this.http.delete<any>(
      this.apiURL + url + `/${id}`, {observe: 'response'}
    );
  }
}
