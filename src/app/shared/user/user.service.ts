import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from '../config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class UserService {

  constructor(private _http: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this._http.get<User[]>(Config.cabin_url+Config.cabin_base+"/users")
    .pipe(
      map( data => {
        let users = []
        data.forEach(user => {
          let newUser = new User();
          newUser.ID = user.ID;
          newUser.first_name = user.first_name;
          newUser.last_name = user.last_name;
          newUser.username = user.username;
          newUser.roles = user.roles;
          newUser.status = user.status;
          newUser.start_time = user.start_time;
          newUser.end_time = user.end_time;
          users.push(newUser);
        });
        console.log("dataa: "+JSON.stringify(data));
        return data;
      })
    );
  }
}
