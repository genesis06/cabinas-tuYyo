import { Injectable } from '@angular/core';
import { Config } from '../config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicule } from '../../models/vehicule';
import { Rent } from '../../models/rent';
import { Cabin } from 'src/app/models/cabin';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 
                              'Authorization': 'Bearer '+ localStorage.getItem(Config.TOKEN_KEY)})
};

@Injectable()
export class RentService {

  constructor(private _http: HttpClient) { }

  getRents(): Observable<any[]>{
    return this._http.get<any[]>(
      Config.cabin_url+Config.cabin_base+"/rents?limit=10", 
      httpOptions
      );
  }

  getNextCheckouts(fromDate: string, toDate:string): Observable<any[]>{
    console.log((Config.cabin_url+Config.cabin_base+"/nextCheckouts?fromDate="+fromDate+"&toDate="+toDate));
    return this._http.get<any[]>(Config.cabin_url+Config.cabin_base+"/nextCheckouts?fromDate="+fromDate+"&toDate="+toDate, httpOptions).pipe();
  
  }

  createRent(rent: Rent){
    return this._http.post(
      Config.cabin_url+Config.cabin_base+"/rents", 
      JSON.stringify({
        cabin_id: rent.cabin_id,
        check_in: rent.check_in ? rent.check_in : JSON.stringify(new Date()),
        contracted_time: rent.contracted_time,
        vehicules: rent.vehicules,
        observations: rent.observations,
        necessary_repairs: rent.necessary_repairs,
        sales_check: rent.sales_check,
        estimated_checkout: rent.estimated_checkout
      }), 
      httpOptions
      );
  }

  getRent(cabinID: number): Observable<Rent>{
    return this._http.get<Rent>(
      Config.cabin_url+Config.cabin_base+"/cabins/"+cabinID+"/rent", 
      httpOptions
      );
  }

  getVehicules(rentID: number): Observable<Vehicule[]>{
    return this._http.get<Vehicule[]>(
      Config.cabin_url+Config.cabin_base+"/rents/"+rentID+"/vehicules", 
      httpOptions
      );
  }

  updateRent(rent: Rent){
    return this._http.put(
      Config.cabin_url+Config.cabin_base+"/rents/"+rent.id, 
      JSON.stringify({
        id: rent.id,
        cabin_id: rent.cabin_id,
        check_in: rent.check_in,
        contracted_time: rent.contracted_time,
        vehicules: rent.vehicules,
        observations: rent.observations,
        necessary_repairs: rent.necessary_repairs,
        sales_check: rent.sales_check
      }), 
      httpOptions
      );
  }

  checkout(cabin: Cabin){
    
    return this._http.put(
      Config.cabin_url+Config.cabin_base+"/cabins/"+cabin.id+"/rents/checkout", 
      {
        id: cabin.id,
        cabin_number: cabin.cabin_number,
        check_out: JSON.stringify(new Date())
      }, 
      httpOptions
      );
  }

  postLostStuff(rent: Rent){
    
    return this._http.put(
      Config.cabin_url+Config.cabin_base+"/rents/"+rent.id+"/lost_stuff", 
      rent, 
      httpOptions
      );
  }
}
