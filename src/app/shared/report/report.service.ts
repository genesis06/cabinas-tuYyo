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
export class ReportService {

  constructor(private _http: HttpClient) { }

  getReport(fromDate:string, toDate:string): Observable<any[]>{

    //console.log((Config.cabin_url+Config.cabin_base+"/report?fromDate="+fromDate+"&toDate="+toDate));
    return this._http.get<any[]>(Config.cabin_url+Config.cabin_base+"/report?fromDate="+fromDate+"&toDate="+toDate, httpOptions).pipe();
  }
}
