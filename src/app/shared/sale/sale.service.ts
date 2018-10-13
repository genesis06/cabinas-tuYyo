import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from '../config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SaleArticule } from 'src/app/models/sale_articule';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SaleService {

  constructor(private _http: HttpClient) { }

  saleArticule(articules: Array<SaleArticule>){
    return this._http.post(
      Config.cabin_url+Config.cabin_base+"/sales",
      {
        date: JSON.stringify(new Date()),
        sale_articules: articules
      }, 
      httpOptions
      );
  }
}
