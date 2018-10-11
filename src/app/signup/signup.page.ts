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

  constructor(private auth: Amplify) { 
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

}
