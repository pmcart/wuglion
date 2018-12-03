import { Injectable} from '@angular/core';

@Injectable()
export class UserService{
    userid: string
    username: string
    imgurl: string
    gender: string
    lasttagdate: string
    cityselected: string
    regionselected: string
    countryselected: string

    setUser(object) {
        console.log('Calling UserService setUser with', object)
        this.userid = object.userid
        this.username= object.username
        this.imgurl= object.imgurl
        this.gender= object.gender
        this.lasttagdate= object.lasttagdate
        this.cityselected= object.cityselected
        this.regionselected= object.regionselected
        this.countryselected= object.countryselected
    }
}
