import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { WorkShiftService } from 'src/app/shared/work-shift/work-shift.service';
import { AuthGuard } from 'src/app/shared/auth-guard/auth-guard.service';

@Component({
  selector: 'add-work-shift-modal',
  templateUrl: './add-work-shift-modal.component.html',
  styleUrls: ['./add-work-shift-modal.component.css'],
  providers: [WorkShiftService]
})
export class AddWorkShiftModalComponent implements OnInit {
  @ViewChild('lgModal') public lgModal:ModalDirective;

  @Output() refresh = new EventEmitter<boolean>();
  
  public isModal:boolean = false;

  public bill1000: number;
  public bill2000: number;
  public bill5000: number;
  public bill10000: number;
  public bill20000: number;
  public bill50000: number;

  constructor(private workShiftService: WorkShiftService, public authGuard: AuthGuard) {
   }

  ngOnInit() {
    this.bill1000 = 0;
    this.bill2000 = 0;
    this.bill5000 = 0;
    this.bill10000 = 0;
    this.bill20000 = 0;
    this.bill50000 = 0;
  }

  sumBills(){
    let sumBill1000 = this.bill1000*1000;
    let sumBill2000 = this.bill2000*2000;
    let sumBill5000 = this.bill5000*5000;
    let sumBill10000 = this.bill10000*10000;
    let sumBill20000 = this.bill20000*20000;
    let sumBill50000 = this.bill50000*50000;
    
    return  sumBill1000+ sumBill2000+ sumBill5000+ sumBill10000+ sumBill20000+ sumBill50000;
  }

  createWorkShift(){

    let moneyReceived = this.sumBills();
    let currentUsername = this.authGuard.getCurrentUser();
    
    this.workShiftService.createWorkShift(moneyReceived, currentUsername)
      .subscribe(
          (data) => {
            console.log(data);
            this.refreshed();
           // this.resetValues();
            this.hideModal();
          },
          (error) => {
              console.info("response error "+JSON.stringify(error,null,4));
             // this.resetValues();
              this.hideModal();
          }
      );
  }

  refreshed(){
    this.refresh.emit(true);
  }


  hideModal(){
    this.lgModal.hide();
  }

  public showModal():void {
    this.isModal = true;
  }

  public onHidden():void {
    this.isModal = false;
  }

 
}
