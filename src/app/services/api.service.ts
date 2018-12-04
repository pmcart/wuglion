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
import {
  Observable
} from 'rxjs'

@Injectable()
export class ApiService {
  
  constructor(private http: Http) {
  }

  getUser(userName) {
    const options = new RequestOptions({
      headers : new Headers({
        'Content-Type': 'application/json'
      })
    });
    return this.http.get(environment.api + '/users/'+userName, options)
    .map(response => response);
  }

  createUser(data) {
    const options = new RequestOptions({
      headers : new Headers({
        'Content-Type': 'application/json'
      })
    });
    return this.http.post(environment.api + '/users/create', data, options)
    .map(response => response);
  }

  getCities() : Observable < any > {
    const options = new RequestOptions({
      headers : new Headers({
        'Content-Type': 'application/json'
      })
    });
    return this.http.get(environment.api + '/locations/cities', options)
    .map(response => response);
  }

  updateUserLocation(userid,data) {
    const options = new RequestOptions({
      headers : new Headers({
        'Content-Type': 'application/json'
      })
    });
    return this.http.post(environment.api + '/users/'+ userid +'/location', data, options)
    .map(response => response);
  }

  getUserLocation(userName) {
    const options = new RequestOptions({
      headers : new Headers({
        'Content-Type': 'application/json'
      })
    });
    return this.http.get(environment.api + '/users/'+userName +'/location', options)
    .map(response => response);
  }

  getBusinessByLocation(locationid) : Observable < any > {
    const options = new RequestOptions({
      headers : new Headers({
        'Content-Type': 'application/json'
      })
    });
    return this.http.get(environment.api + '/business?locationid='+locationid, options)
    .map(response => response);
  }
}
