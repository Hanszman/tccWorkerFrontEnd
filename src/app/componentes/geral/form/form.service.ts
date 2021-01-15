import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private apiURL = environment.apiURL;

  constructor(private http: HttpClient) { }

  postUpload(files: Set<File>) {
    const formData = new FormData();
    files.forEach(file => formData.append('file', file, file.name));
    return this.http.post(this.apiURL + 'upload', formData);
  }

  postForm(url, data) {
    console.log(this.apiURL + url);
    console.log(data);
    return this.http.post(this.apiURL + url, data, {observe: 'response'});
  }

  // postCadastrar(){}
  // postEditar(){}
  // postDeletar(){}
}
