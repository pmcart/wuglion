import { Component, OnInit, NgZone } from '@angular/core';
import {
  Router,
} from '@angular/router';
import {ApiService} from '../services/api.service'
import {UserService} from '../services/user.service'

@Component({
  selector: 'app-choose-location',
  templateUrl: './choose-location.page.html',
  styleUrls: ['./choose-location.page.scss'],
})
export class ChooseLocationPage implements OnInit {

  isLoggedIn: boolean = false;
  selectedCity = "@";
  // cities = [
  //   {id: 1, name: "Letterkenny"},
  //   {id: 2, name: "Dublin"},
  //   {id: 3, name: "Galway"},
  //   {id: 4, name: "Limerick"},
  //   {id: 5, name: "Cork"}
  // ];
  cities: any; 
  constructor(private router: Router,
    private apiService: ApiService,
    private userService: UserService, private _zone: NgZone) {

    }
   

    setLocation(): any {
      this.apiService.updateUserLocation(this.userService);
      //this.userService.citySelected = this.selectedCity['id'];
      this.router.navigate(['/home']);
      //console.log(this.selectedCity['name']);
    }

  ngOnInit() {
    //this._zone.run(() =>{
    this.apiService.getCities().subscribe(data => {
      console.log(data)
      this.cities = JSON.parse(data._body)
    });
    //});
  }

}
