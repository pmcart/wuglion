import { Component, OnInit } from '@angular/core';
//import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import {
  FacebookService,
  LoginResponse
} from 'ngx-facebook';

import Amplify, { Auth } from 'aws-amplify';
import { environment } from './../../environments/environment';
import {
  Http,
  Response,
  RequestOptions,
  RequestOptionsArgs,
  Headers
} from '@angular/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(private amplify: Amplify, private fb: FacebookService, private http:Http) { 
    Amplify.configure(environment.amplify);

    
  }

  ngOnInit() {
  }

  signup(username:string,password:string){
    console.log('Clicked')
    //console.log(Auth.getAmplifyDetails())
    Auth.signUp({
      username,
      password
      })
      .then(data => 
        {
          console.log(data)
        
          var options = new RequestOptions({
            headers : new Headers({
              'Content-Type':'application/json',
              'X-Amz-Date':'',
              'Authorization':'',
              'X-Api-Key':'Qbamo0p58RapKt01y76I04ma6CRVG1JY9DiZ88cI',
              'X-Amz-Security-Token':''
            })
          });
         
            this.http.post("https://54nd9roo94.execute-api.eu-west-1.amazonaws.com/dev/users", data,options).subscribe(
              data => {
                console.log(data)
              },
              error => {
                console.log(JSON.stringify(error.json()));
              }
            )
          
        })
      .catch(err => console.log(err));
  }

  signupFacebook(): void {
    console.log('Calling signupFacebook');

      this.fb.login().then((response: LoginResponse) => {
        if (response.authResponse) {
          const token = response.authResponse.accessToken
          const expires = response.authResponse.expiresIn
          const userID = response.authResponse.userID
          console.log(response.authResponse)
          console.log('You are now logged in.')
        
          Auth.federatedSignIn('facebook', { token, expires_at: expires}, { name: 'test' })
          .then(credentials => {
            console.log('get aws credentials', credentials);
          }).catch(e => {
            console.log(e);
          });
     
        } else {
          console.log('There was a problem logging you in.');
        }
      
        }).catch((error: any) => console.error(error));
      }

}
