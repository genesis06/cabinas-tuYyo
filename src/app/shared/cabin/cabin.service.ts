import { Injectable } from '@angular/core';
import { Config } from '../config';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Cabin } from '../../models/cabin';
@Injectable()
export class CabinService {

  constructor(private _http: HttpClient) { }

  getCabins(): Observable<Cabin[]>{
    return this._http.get<Cabin[]>(Config.cabin_url+Config.cabin_base+"/cabins").pipe(
      map(heroes => heroes)
      );
  }
}

