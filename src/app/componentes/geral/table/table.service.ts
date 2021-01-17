import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private apiURL = environment.apiURL;

  constructor(private http: HttpClient) { }

  getTable(url, filtro): Observable<HttpResponse<any>> {
    return this.http.get<any>(
      this.apiURL + url + `&${filtro}`, {observe: 'response'}
    );
  }
}
