import { Component, OnInit } from '@angular/core';
//import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import {
  FacebookService,
  LoginResponse
} from 'ngx-facebook';
import Amplify, { Auth } from 'aws-amplify';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private auth: Amplify,private router: Router,private fb: FacebookService) 
  { }

  ngOnInit() {
    // this.auth.signIn('admin@example.com', '12345678')
    //   .subscribe(
    //     result => {
    //       console.log(result)
    //       this.router.navigate(['/']);
    //     },
    //     error => {
    //       console.log(error);
    //     });
    this.loginWithFacebook()
  }

  loginWithFacebook(): void {
    console.log('Calling loginWithFacebook');

      this.fb.login().then((response: LoginResponse) => {
        if (response.authResponse) {
          const token = response.authResponse.accessToken
          const expires = response.authResponse.expiresIn
          const userID = response.authResponse.userID
          console.log(response.authResponse)
          //console.log('You are now logged in.');
          // return Auth.federatedSignIn('facebook', { token, expires_at: expires}, { name: userID })
          // .then(credentials => {
          //   console.log('get aws credentials', credentials);
          // }).catch(e => {
          //   console.log(e);
          // });
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
