import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http' 
import { User } from '../../models/user';
import { Config } from '../config';

@Injectable()
export class LoginService {

  constructor(private _http: Http) { }

  login(user : User){
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    //console.log(Config.cabin_url+"/authenticate");
    
    return this._http.post(
        Config.cabin_url+"/authenticate",
        JSON.stringify({
            username: user.username,
            password: user.password
        }),
        {headers : headers} 
    );
  }
}
