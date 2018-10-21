import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Articule } from '../../models/articule';
import { Config } from '../config';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ReportService {

  constructor(private _http: HttpClient) { }

  getReport(): Observable<any[]>{
    return this._http.get<any[]>(Config.cabin_url+Config.cabin_base+"/report").pipe();
  }
}
