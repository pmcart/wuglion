import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { 
  }

  ngOnInit() {
    this.auth.signIn('admin@example.com', '12345678')
      .subscribe(
        result => {
          console.log(result)
          this.router.navigate(['/']);
        },
        error => {
          console.log(error);
        });
  }

}
