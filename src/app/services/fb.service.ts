import { Injectable } from '@angular/core';
import {
  FacebookService,
  LoginResponse,
  LoginOptions
} from 'ngx-facebook';

@Injectable()
export class FbService {
  
  constructor(private fb: FacebookService) {
  }

  getUserDetails() {
    return this.fb.api('/me?fields=name,email,id,hometown,location');
  }

  login() {
    const options: LoginOptions = {
      scope: 'public_profile,user_friends,email,pages_show_list',
      return_scopes: true,
      enable_profile_selector: true
    };
    return this.fb.login(options);
  }
}
