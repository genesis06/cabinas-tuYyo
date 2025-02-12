import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Articule } from '../../models/articule';
import { Config } from '../config';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 
                              'Authorization': 'Bearer '+ localStorage.getItem(Config.TOKEN_KEY)})
};

@Injectable()
export class ArticuleService {

  constructor(private _http: HttpClient) { }

  getArticules(): Observable<Articule[]>{
    return this._http.get<Articule[]>(Config.cabin_url+Config.cabin_base+"/items", httpOptions).pipe();
  }
}
