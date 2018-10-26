import { Injectable } from '@angular/core';
import { Config } from '../config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WorkShift } from 'src/app/models/work_shift';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class WorkShiftService {

  constructor(private _http: HttpClient) { }

  createWorkShift(moneyReceived: number, username: string){
    return this._http.post(
      Config.cabin_url+Config.cabin_base+"/workShifts", 
      JSON.stringify({
        money_received: moneyReceived,
        username: username
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

  getWorkShifts(): Observable<WorkShift[]>{
    return this._http.get<WorkShift[]>(Config.cabin_url+Config.cabin_base+"/workShifts").pipe();
  }
}
