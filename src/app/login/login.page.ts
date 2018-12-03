import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Amplify, { Auth } from 'aws-amplify';
import { environment } from './../../environments/environment';
import { ApiService } from '../services/api.service';
import {
  FbService
} from '../services/fb.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userConfirmed = true;

  constructor(private amplify: Amplify, private fb: FbService, private apiService: ApiService, private userService: UserService, private router: Router,) {
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

          this.apiService.getUser(username).subscribe(
            response => {
              this.navigateRoute(response)
            },
            error => {
              console.log(JSON.stringify(error.json()));
            },
            () => {
            console.log('Complete');
            }
          );
          
      })
      .catch(err => 
      {
        if(err.code = 'UserNotConfirmedException')
        this.userConfirmed = false;

        console.log(err)
      });
  }

  navigateRoute(response) {
    this.userService.setUser(response.json()[0])
              
    if(!this.userService.cityselected ||
      this.userService.cityselected == 'null'){
        this.router.navigateByUrl('/choose-location');
      }
    else{
      this.router.navigateByUrl('/home');
    }
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
                this.userService.setUser(response)

                if(response.ok){      
                Auth.federatedSignIn('facebook', { token, expires_at: expires}, { name: 'test' })
                .then(credentials => {
                  this.navigateRoute(response);
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
