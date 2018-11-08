import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FacebookService,
  LoginResponse,
  LoginOptions
} from 'ngx-facebook';
import Amplify, { Auth } from 'aws-amplify';
import { environment } from './../../environments/environment';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(private amplify: Amplify, private fb: FacebookService, private apiService: ApiService) {
    Amplify.configure(environment.amplify);
  }

  ngOnInit() {
  }

  signup(username: string, password: string) {
    // Cognito Signup
    Auth.signUp({
      username,
      password
      })
      .then(data => {
          console.log(data);
          this.apiService.createUser(data);
        })
      .catch(err => console.log(err));
  }

  signupFacebook(): void {
      console.log('Calling signupFacebook');

      const options: LoginOptions = {
        scope: 'public_profile,user_friends,email,pages_show_list',
        return_scopes: true,
        enable_profile_selector: true
      };

      this.fb.login(options).then((response: LoginResponse) => {
        if (response.authResponse) {
          const token = response.authResponse.accessToken;
          const expires = response.authResponse.expiresIn;
          const userID = response.authResponse.userID;

          this.fb.api('/me?fields=name,email,id,hometown,location').then(res => {
                console.log(res);
                Auth.federatedSignIn('facebook', { token, expires_at: expires}, { name: 'test' })
                .then(credentials => {            
                  const userData = {
                    userSub:  '',
                    user: {
                      username: res.email
                    }
                  };
                  this.apiService.createUser(userData);
                }).catch(e => {
                  console.log(e);
                });
            }
          ).catch(e => console.log(e));

        } else {
          console.log('There was a problem logging you in.');
        }

        }).catch((error: any) => console.error(error));
      }

}
