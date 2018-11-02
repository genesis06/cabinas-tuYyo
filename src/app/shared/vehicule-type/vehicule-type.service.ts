import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VehiculeType } from '../../models/vehicule_type';
import { Config } from '../config';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 
                              'Authorization': 'Bearer '+ localStorage.getItem(Config.TOKEN_KEY)})
};

@Injectable()
export class VehiculeTypeService {

  constructor(private _http: HttpClient) { }

  getVehiculeTypes(): Observable<VehiculeType[]>{
    return this._http.get<VehiculeType[]>(Config.cabin_url+Config.cabin_base+"/vehiculeTypes", httpOptions).pipe();
  }
}
