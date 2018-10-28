import { Injectable } from '@angular/core';
import { Config } from '../config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WorkShift } from 'src/app/models/work_shift';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 
                              'Authorization': 'Bearer '+ localStorage.getItem(Config.TOKEN_KEY)})
};

@Injectable()
export class WorkShiftService {

  constructor(private _http: HttpClient) { }

  createWorkShift(moneyReceived: number, username: string){
    return this._http.post(
      Config.cabin_url+Config.cabin_base+"/workShifts", 
      JSON.stringify({
        money_received: moneyReceived,
        username: username, 
        date_time: JSON.stringify(new Date())
      }), 
      httpOptions
      );
  }

  updateWorkShift(workShift: WorkShift){
    return this._http.put(
      Config.cabin_url+Config.cabin_base+"/workShifts/"+workShift.id, 
      JSON.stringify({
        money_received: workShift.money_received,
        money_delivered: workShift.money_delivered,
        date_time: JSON.stringify(new Date()),
        username: workShift.username,
        notes: workShift.notes  
      }), 
      httpOptions
      );
  }

  getWorkShifts(fromDate, toDate): Observable<WorkShift[]>{
    console.log(Config.cabin_url+Config.cabin_base+"/workShifts?fromDate="+fromDate+"&toDate="+toDate)
    return this._http.get<WorkShift[]>(Config.cabin_url+Config.cabin_base+"/workShifts?fromDate="+fromDate+"&toDate="+toDate, httpOptions).pipe();
  }
}
