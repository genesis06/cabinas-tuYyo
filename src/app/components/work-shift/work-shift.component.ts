import { Component, OnInit } from '@angular/core';
import { WorkShiftService } from 'src/app/shared/work-shift/work-shift.service';
import { WorkShift } from 'src/app/models/work_shift';
import { AuthGuard } from 'src/app/shared/auth-guard/auth-guard.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'work-shift',
  templateUrl: './work-shift.component.html',
  styleUrls: ['./work-shift.component.css'],
  providers: [WorkShiftService]
})
export class WorkShiftComponent implements OnInit {

  public workShifts: Array<WorkShift>;
  public date: string;
  public fromDate: string;
  public toDate: string;

  public currentUsername: string;


  constructor(private workShiftService: WorkShiftService, public authGuard: AuthGuard, private toastr: ToastrService) { }

  ngOnInit() {
    this.initCurrentDate();
    this.initFromDate();
    this.initToDate();
    this.getWorkShifts();

    this.currentUsername = this.authGuard.getCurrentUser();
  }

  initCurrentDate(){
    let current = new Date();

    this.date = current.getFullYear()+"-"+(current.getMonth()+1)+"-"+current.getDate();
  }

  getWorkShifts(search?: boolean){
    this.workShiftService.getWorkShifts(this.fromDate, this.toDate)
    .subscribe(workShifts => {
      this.workShifts = workShifts;

      if(this.workShifts.length == 0){
        if(search){
          this.showInfo("No hay turnos registrados en la fecha ingresada");
        }
        else{
          this.showInfo("No hay turnos registrados el día de hoy");
        }
        
      }
    //  console.log(new Date(JSON.parse(users[0].start_time)));
      //console.log(workShifts);
    },
    (error) => {
      this.showError();
        //console.info("response error "+JSON.stringify(error,null,4));
        
    });
  }

  initFromDate(){
    let current = new Date();
    current.setHours(0,0,0,0);

    let date = JSON.stringify(current).toString();
    this.fromDate = date.substring(1,date.length-1);
    //console.log(this.fromDate);
    //console.log(JSON.stringify(current));
  }

  initToDate(){
    let current = new Date();
    current.setHours(23,59,59);

    let date = JSON.stringify(current).toString();
    this.toDate = date.substring(1,date.length-1); //Remove "" characters
    
    //console.log(this.toDate);
    //console.log(JSON.stringify(current));
  }

  getFromDate(){
    let dateSplit = this.date.split("-");
    let year = dateSplit[0];
    let month = dateSplit[1];
    let day = dateSplit[2];

    let dateJson = JSON.stringify(new Date(Number(year), Number(month)-1, Number(day)));

    return dateJson.substring(1,dateJson.length-1);
  }
  getToDate(){
    let dateSplit = this.date.split("-");
    let year = dateSplit[0];
    let month = dateSplit[1];
    let day = dateSplit[2];

    let dateJson = JSON.stringify(new Date(Number(year), Number(month)-1, Number(day),23,59,59));

    return dateJson.substring(1,dateJson.length-1);
  }

  onRefresh(refresh){
    if(refresh){
     this.getWorkShifts();
    }
  }

  search(){
    this.fromDate = this.getFromDate();
    this.toDate = this.getToDate();
    this.getWorkShifts(true);
  }

  showSuccess() {
    this.toastr.success("Información de alquiler actualizada", "Exitoso");
  }

  showInfo(message: string) {
    this.toastr.info(message, "Info");
  }

  showError() {
    this.toastr.error("No se pudo obtener información de los turnos", "Error");
  }

}
