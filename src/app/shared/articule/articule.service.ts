import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Articule } from '../../models/articule';
import { Config } from '../config';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ArticuleService {

  constructor(private _http: HttpClient) { }

  getArticules(): Observable<Articule[]>{
    return this._http.get<Articule[]>(Config.cabin_url+Config.cabin_base+"/items").pipe();
  }
}
