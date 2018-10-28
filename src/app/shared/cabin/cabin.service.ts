import { Injectable } from '@angular/core';
import { Config } from '../config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cabin } from '../../models/cabin';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 
                              'Authorization': 'Bearer '+ localStorage.getItem(Config.TOKEN_KEY)})
};

@Injectable()
export class CabinService {

  constructor(private _http: HttpClient) { }

  getCabins(): Observable<Cabin[]>{
    return this._http.get<Cabin[]>(Config.cabin_url+Config.cabin_base+"/cabins", httpOptions).pipe();
  }

  updateCabin(cabin: Cabin){
    return this._http.put(Config.cabin_url+Config.cabin_base+"/cabins/"+cabin.id, cabin, httpOptions).pipe();
  }
}

