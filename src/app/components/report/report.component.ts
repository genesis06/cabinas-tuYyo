import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/shared/report/report.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers:[ReportService]
})
export class ReportComponent implements OnInit {

  public report: Array<any> =[];
  public date: string;
  public fromDate: string;
  public toDate: string;


  constructor(private reportService: ReportService, private toastr: ToastrService) { }

  ngOnInit() {
    this.initCurrentDate();
    this.initFromDate();
    this.initToDate();
    this.getReport();
  }

  initCurrentDate(){
    let current = new Date();

    this.date = current.getFullYear()+"-"+(current.getMonth()+1)+"-"+current.getDate();
  }

  getReport(search? : boolean){
    this.reportService.getReport(this.fromDate, this.toDate)
    .subscribe(report => {
      this.report = report

      if(this.report.length == 0){
        if(search){
          this.showInfo("No hay reporte de alquileres ni ventas en la fecha ingresada");
        }
        else{
          this.showInfo("No hay reporte de alquileres ni ventas el día de hoy");
        }
        
      }
      
      //console.log(report);
    });
  }

  getTotal(){
    let total = 0;
    this.report.forEach(item =>{
      total += item.price;    
    })
    
    return total;
  }

  search(){
    this.fromDate = this.getFromDate();
    this.toDate = this.getToDate();

    this.getReport(true);
  }

  initFromDate(){
    let current = new Date();
    current.setHours(0,0,0,0);

    let date = JSON.stringify(current).toString();
    this.fromDate = date.substring(1,date.length-1);
   // console.log(this.fromDate);
   // console.log(JSON.stringify(current));
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

  showInfo(message: string) {
    this.toastr.info(message, "Info");
  }

}
