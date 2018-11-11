import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Amplify, { Auth } from 'aws-amplify';
import { environment } from './../../environments/environment';
import { ApiService } from '../services/api.service';
import {
  FbService
} from '../services/fb.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(private amplify: Amplify, private fb: FbService, private apiService: ApiService, private router: Router,) {
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
          this.apiService.createUser(data).subscribe(
              response => {
                console.log(response);
                this.router.navigateByUrl('/home');
              },
              error => {
                console.log(JSON.stringify(error.json()));
              },
              () => {
              console.log('Complete');
              }
            );
        })
      .catch(err => console.log(err));
  }

  signupFacebook(): void {
      console.log('Calling signupFacebook');

      this.fb.login().then((response) => {
        if (response.authResponse) {
          const token = response.authResponse.accessToken;
          const expires = response.authResponse.expiresIn;
          const userID = response.authResponse.userID;
          this.fb.getUserDetails().then( res => {
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
          }).catch(e => console.log(e));

        } else {
          console.log('There was a problem logging you in.');
        }

        }).catch((error: any) => console.error(error));
      }

}
