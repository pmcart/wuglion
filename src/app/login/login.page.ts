import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Amplify, { Auth } from 'aws-amplify';
import { environment } from './../../environments/environment';
import { ApiService } from '../services/api.service';
import {
  FbService
} from '../services/fb.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private amplify: Amplify, private fb: FbService, private apiService: ApiService, private router: Router,) {
    Amplify.configure(environment.amplify);
  }

  ngOnInit() {
  }

  login(username: string, password: string) {
    // Cognito Signup
    console.log(username)
    console.log(password)
    Auth.signIn(
      username,
      password
      )
      .then(data => {
          console.log(data);
          this.router.navigateByUrl('/choose-location');
      })
      .catch(err => console.log(err));
  }

  loginFacebook(): void {
      console.log('Calling loginFacebook');

      this.fb.login().then((response) => {
        if (response.authResponse) {
          const token = response.authResponse.accessToken;
          const expires = response.authResponse.expiresIn;
          const userID = response.authResponse.userID;

          this.fb.getUserDetails().then( res => {

            this.apiService.getUser(res.email).subscribe(
              response => {
                console.log(response)

                if(response.ok){      
                Auth.federatedSignIn('facebook', { token, expires_at: expires}, { name: 'test' })
                .then(credentials => {
                  this.router.navigateByUrl('/choose-location');
                })
                }
              },
              error => {
                console.log(JSON.stringify(error.json()));
              },
              () => {
              console.log('Complete');
              }
            );
          }).catch(e => console.log(e));

        } else {
          console.log('There was a problem logging you in.');
        }

        }).catch((error: any) => console.error(error));
      }

}
