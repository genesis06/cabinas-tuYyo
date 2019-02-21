import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { WorkShiftService } from 'src/app/shared/work-shift/work-shift.service';
import { AuthGuard } from 'src/app/shared/auth-guard/auth-guard.service';
import { ToastrService } from 'ngx-toastr';

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

  public moneyReceived: number;

  public bill1000: number;
  public bill2000: number;
  public bill5000: number;
  public bill10000: number;
  public bill20000: number;
  public bill50000: number;

  public isLoading: boolean = false;

  constructor(private workShiftService: WorkShiftService, public authGuard: AuthGuard, private toastr: ToastrService) {
   }

  ngOnInit() {
    this.bill1000 = 0;
    this.bill2000 = 0;
    this.bill5000 = 0;
    this.bill10000 = 0;
    this.bill20000 = 0;
    this.bill50000 = 0;
    this.moneyReceived = 0;
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

  createWorkShift(){

    let moneyReceived = this.sumBills() == 0 ? this.moneyReceived : this.sumBills();
    let currentUsername = this.authGuard.getCurrentUser();

    if( this.validFields()){
      this.isLoading = true;
      this.workShiftService.createWorkShift(moneyReceived, currentUsername)
      .subscribe(
          (data) => {
            this.showSuccess();
            this.refreshed();
           // this.resetValues();
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
    if(this.sumBills() == 0 && (this.moneyReceived == 0 || this.moneyReceived == null)){
      this.showWarning("Ingrese el monto del dinero recibido");
      return false;
    }else{
      
      return true;
    }
  }

  refreshed(){
    this.refresh.emit(true);
  }


  hideModal(){
    this.lgModal.hide();
    this.showInfo();
  }

  public showModal():void {
    this.isModal = true;
  }

  public onHidden():void {
    this.isModal = false;
  }

  showSuccess() {
    this.toastr.success("El turno fue creado", "Exitoso");
  }

  showInfo() {
    this.toastr.info("Turno no agregado", "Info");
  }

  showError() {
    this.toastr.error("No se pudo agregar el turno", "Error");
  }

  showWarning(message: string) {
    this.toastr.warning(message, "Advertencia");
  }

 
}
