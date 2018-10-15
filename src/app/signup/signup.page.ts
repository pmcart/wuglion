import { Component, OnInit } from '@angular/core';
//import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import {
  FacebookService,
  LoginResponse
} from 'ngx-facebook';

import Amplify, { Auth } from 'aws-amplify';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(private amplify: Amplify, private fb: FacebookService) { 
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
      .then(data => console.log(data))
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
          // Add the Facebook access token to the Cognito credentials login map.
          // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          //   IdentityPoolId: 'IDENTITY_POOL_ID',
          //   Logins: {
          //     'graph.facebook.com': response.authResponse.accessToken
          //   }
          // });
      
          // Obtain AWS credentials
          // AWS.config.credentials.get(function(){
          //   // Credentials will be available when this function is called.
          //   var accessKeyId = AWS.config.credentials.accessKeyId;
          //   var secretAccessKey = AWS.config.credentials.secretAccessKey;
          //   var sessionToken = AWS.config.credentials.sessionToken;
          // });
      
        } else {
          console.log('There was a problem logging you in.');
        }
      
        }).catch((error: any) => console.error(error));
      }

}
