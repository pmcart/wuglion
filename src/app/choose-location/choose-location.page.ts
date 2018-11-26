import { Component, OnInit } from '@angular/core';
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

  private isLoggedIn: boolean = false;
  selectedCity = "@";
  // cities = [
  //   {id: 1, name: "Letterkenny"},
  //   {id: 2, name: "Dublin"},
  //   {id: 3, name: "Galway"},
  //   {id: 4, name: "Limerick"},
  //   {id: 5, name: "Cork"}
  // ];
  private cities: any; 
  constructor(private router: Router,
    private apiService: ApiService,
    private userService: UserService) {

      this.apiService.getCities().subscribe(cities => {
        this.cities = cities;
      });
    }
   

    setLocation(): any {
      this.apiService.updateUserLocation(this.userService);
      //this.userService.citySelected = this.selectedCity['id'];
      this.router.navigate(['/home']);
      //console.log(this.selectedCity['name']);
    }

  ngOnInit() {
  }

}
