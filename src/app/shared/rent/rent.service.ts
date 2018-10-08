import { Injectable } from '@angular/core';
import { Config } from '../config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicule } from '../../models/vehicule';
import { Rent } from '../../models/rent';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class RentService {

  constructor(private _http: HttpClient) { }

  createRent(rent: Rent){
    return this._http.post(
      Config.cabin_url+Config.cabin_base+"/rents", 
      JSON.stringify({
        cabin_id: rent.cabinID,
        check_in: JSON.stringify(new Date()),
        contracted_time: rent.contractedTime,
        vehicules: rent.vehicules,
        observations: rent.observations,
        necessary_repairs: rent.necessaryRepairs
      }), 
      httpOptions
      );
  }

  getRent(cabinID: number){
    return this._http.get(
      Config.cabin_url+Config.cabin_base+"/rents/cabins/"+cabinID, 
      httpOptions
      );
  }
}
