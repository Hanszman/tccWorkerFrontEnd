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

  // postUpload(files: Set<File>) {
  //   const formData = new FormData();
  //   files.forEach(file => formData.append('file', file, file.name));
  //   return this.http.post(this.apiURL + 'upload', formData);
  // }

  // postForm(url, data) {
  //   console.log(this.apiURL + url);
  //   console.log(data);
  //   return this.http.post(this.apiURL + url, data, {observe: 'response'});
  // }

  postCadastrar(url, dados): Observable<HttpResponse<any>>{
    return this.http.post<any>(
      this.apiURL + url, dados, {observe: 'response'}
    );
  }

  putEditar(url, id, dados): Observable<HttpResponse<any>> {
    return this.http.put<any>(
      this.apiURL + url + `/${id}`, dados, {observe: 'response'}
    );
  }

  delete(){

  }
}
