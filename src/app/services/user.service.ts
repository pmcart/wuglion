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
}
