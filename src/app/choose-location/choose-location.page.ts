import { Component, OnInit, NgZone } from '@angular/core';
import {
  Router,
} from '@angular/router';
import { ApiService } from '../services/api.service'
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-choose-location',
  templateUrl: './choose-location.page.html',
  styleUrls: ['./choose-location.page.scss'],
})
export class ChooseLocationPage implements OnInit {

  isLoggedIn: boolean = false;
  selectedCity = "@";
  cities: any;

  constructor(private router: Router,
    private apiService: ApiService,
    private userService: UserService, private _zone: NgZone) {

  }

  setLocation(): any {
    this.apiService.updateUserLocation(this.userService.userid, this.selectedCity).subscribe(data => {
      this.userService.cityselected = this.selectedCity;
      this.router.navigate(['/home']);
      console.log('Called setLocation()')
    });
    
  }

  ngOnInit() {

    this.apiService.getCities().subscribe(data => {
      console.log(data)
      this.cities = JSON.parse(data._body)
    });

  }

}
