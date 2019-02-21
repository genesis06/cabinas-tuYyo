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
  
  public moneyDelivered: number;

  public bill1000: number;
  public bill2000: number;
  public bill5000: number;
  public bill10000: number;
  public bill20000: number;
  public bill50000: number;
  
  public isLoading: boolean = false;

  constructor(private workShiftService: WorkShiftService, private toastr: ToastrService) {
   }

   ngOnInit() {
    this.bill1000 = 0;
    this.bill2000 = 0;
    this.bill5000 = 0;
    this.bill10000 = 0;
    this.bill20000 = 0;
    this.bill50000 = 0;
    this.moneyDelivered = 0;
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

  isDisabled(){
    return this.isLoading;
  }

  updateWorkShift(){

    this.newWorkShift.money_delivered = this.sumBills() == 0 ? this.moneyDelivered : this.sumBills();
    
    if( this.validFields()){
      this.isLoading = true;
      this.workShiftService.updateWorkShift(this.newWorkShift)
      .subscribe(
          (data) => {
           // this.resetValues();
           this.showSuccess();
            this.refreshed();
            this.lgModal.hide();
            this.isLoading = false;
          },
          (error) => {
              console.info("response error "+JSON.stringify(error,null,4));
             // this.resetValues();
             this.showError();
             this.lgModal.hide();
             this.isLoading = false;
          }
      );
    } 
  }

  validFields(){
    if(this.sumBills() == 0 && this.moneyDelivered == 0 && this.newWorkShift.money_received == 0){
      this.showWarning("Ingrese los montos del dinero recibido y el dinero entregado");
      return false;
    }
    else if(this.newWorkShift.money_received == 0 || this.newWorkShift.money_received == null){
      this.showWarning("Ingrese el monto del dinero recibido");
      return false;
    }
    else if(this.sumBills() == 0 && (this.moneyDelivered == 0 || this.moneyDelivered == null)){
      this.showWarning("Ingrese el monto del dinero entregado");
      return false;
    }
    else{
      return true;
    }
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

  showWarning(message: string) {
    this.toastr.warning(message, "Advertencia");
  }

  showInfo() {
    this.toastr.info("Turno no actualizado", "Info");
  }

  showError() {
    this.toastr.error("No se pudo hacer el cambio turno", "Error");
  }

}
