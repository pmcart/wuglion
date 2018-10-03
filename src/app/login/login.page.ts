import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import {
  FacebookService,
  LoginResponse
} from 'ngx-facebook';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private auth: AuthService,private router: Router,private fb: FacebookService) 
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
      
        }).catch((error: any) => console.error(error));
      }
    
}
