import { Component, OnInit } from '@angular/core';
import { WorkShiftService } from 'src/app/shared/work-shift/work-shift.service';
import { WorkShift } from 'src/app/models/work_shift';

@Component({
  selector: 'work-shift',
  templateUrl: './work-shift.component.html',
  styleUrls: ['./work-shift.component.css'],
  providers: [WorkShiftService]
})
export class WorkShiftComponent implements OnInit {

  public workShifts: Array<WorkShift>;

  constructor(private workShiftService: WorkShiftService) { }

  ngOnInit() {
    this.getWorkShifts();
  }

  getWorkShifts(){
    this.workShiftService.getWorkShifts()
    .subscribe(workShifts => {
      this.workShifts = workShifts;
    //  console.log(new Date(JSON.parse(users[0].start_time)));
      console.log(workShifts);
    });
  }

  onRefresh(refresh){
    if(refresh){
     this.getWorkShifts();
    }
  }

}
