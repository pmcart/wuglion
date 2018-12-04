import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'
import { UserService } from '../services/user.service'
import {
  Router,
} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  locations

  constructor(private router: Router,
    private apiService: ApiService,
    private userService: UserService) {

  }

  ngOnInit() {
    console.log(this.userService)
    this.apiService.getBusinessByLocation(this.userService.locationid).subscribe(data => {
      console.log(data)
      this.locations = JSON.parse(data._body)
    });

  }

}
