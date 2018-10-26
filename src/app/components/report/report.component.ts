import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/shared/report/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers:[ReportService]
})
export class ReportComponent implements OnInit {

  public report: Array<any>;
  public date: string;
  public fromDate: string;
  public toDate: string;

  public total: number = 0;

  constructor(private reportService: ReportService) { }

  ngOnInit() {
    
    this.initFromDate();
    this.initToDate();
    this.getReport();
  }

  getReport(){
    this.reportService.getReport(this.fromDate, this.toDate)
    .subscribe(report => {
      this.report = report

      this.report.forEach(item =>{
        this.total += item.price;
      })
      console.log(report);
    });
  }

  getReportWithFilter(){
    this.total = 0;
    let fromDate = this.getFromDate();
    let toDate = this.getToDate();

    this.reportService.getReport(fromDate, toDate)
    .subscribe(report => {
      this.report = report;
      
      this.report.forEach(item =>{
        this.total += item.price;
      })
      console.log(report);
    });
  }

  initFromDate(){
    let current = new Date();
    current.setHours(0,0,0,0);

    let date = JSON.stringify(current).toString();
    this.fromDate = date.substring(1,date.length-1);
    console.log(this.fromDate);
    console.log(JSON.stringify(current));
  }

  initToDate(){
    let current = new Date();
    current.setHours(23,59,59);

    let date = JSON.stringify(current).toString();
    this.toDate = date.substring(1,date.length-1); //Remove "" characters
    
    console.log(this.toDate);
    console.log(JSON.stringify(current));
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

}