import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { WorkShift } from 'src/app/models/work_shift';
import { WorkShiftService } from 'src/app/shared/work-shift/work-shift.service';
import * as _ from "lodash";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'edit-work-shift-modal',
  templateUrl: './edit-work-shift-modal.component.html',
  styleUrls: ['./edit-work-shift-modal.component.css']
})
export class EditWorkShiftModalComponent implements OnInit {

  @ViewChild('lgModal') public lgModal: ModalDirective;
  
  @Input("workShift") public workShift: WorkShift;
  @Output() refresh = new EventEmitter<boolean>();

  public newWorkShift: WorkShift;
  public isModal:boolean = false;

  public bill1000: number;
  public bill2000: number;
  public bill5000: number;
  public bill10000: number;
  public bill20000: number;
  public bill50000: number;
  

  constructor(private workShiftService: WorkShiftService, private toastr: ToastrService) {
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

  updateWorkShift(){

    this.newWorkShift.money_delivered = this.sumBills();
    
    this.workShiftService.updateWorkShift(this.newWorkShift)
      .subscribe(
          (data) => {
            console.log(data);
           // this.resetValues();
           this.showSuccess();
            this.refreshed();
            this.lgModal.hide();
          },
          (error) => {
              console.info("response error "+JSON.stringify(error,null,4));
             // this.resetValues();
             this.showError();
             this.lgModal.hide();
          }
      );
  }


  hideModal(){
    this.lgModal.hide();
    this.showInfo();
  }

  public showModal():void {
    this.isModal = true;
    this.newWorkShift = _.cloneDeep(this.workShift);
  }

  public onHidden():void {
    this.isModal = false;
  }

  refreshed(){
    this.refresh.emit(true);
  }

  showSuccess() {
    this.toastr.success("El cambio de turno fue realizado", "Exitoso");
  }

  showInfo() {
    this.toastr.info("Turno no actualizado", "Info");
  }

  showError() {
    this.toastr.error("No se pudo hacer el cambio turno", "Error");
  }

}
