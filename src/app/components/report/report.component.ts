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

  constructor(private reportService: ReportService) { }

  ngOnInit() {
    this.getReport();
  }

  getReport(){
    this.reportService.getReport()
    .subscribe(report => {
      this.report = report
      console.log(report);
    });
  }

}
