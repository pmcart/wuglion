import { Injectable } from '@angular/core';
import {
  Http,
  Response,
  RequestOptions,
  RequestOptionsArgs,
  Headers
} from '@angular/http';
import { environment } from './../../environments/environment';
import 'rxjs/Rx';

@Injectable()
export class ApiService {
  
  constructor(private http: Http) {
  }

  createUser(data) {

    const options = new RequestOptions({
      headers : new Headers({
        'Content-Type': 'application/json'
      })
    });
    return this.http.post(environment.api + '/users/create', data, options)
    .map(response => response);
    // return this.http.post(environment.api + '/users/create', data, options).subscribe(
    //   response => {
    //     console.log(response);
    //   },
    //   error => {
    //     console.log(JSON.stringify(error.json()));
    //   }
    // );
  }
}
