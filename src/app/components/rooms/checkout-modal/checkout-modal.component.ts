import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Rent } from 'src/app/models/rent';
import { RentService } from 'src/app/shared/rent/rent.service';
import { Cabin } from 'src/app/models/cabin';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'checkout-modal',
  templateUrl: './checkout-modal.component.html',
  styleUrls: ['./checkout-modal.component.css'],
  providers: [RentService]
})
export class CheckoutModalComponent implements OnInit {

  @ViewChild('lgModal') public lgModal:ModalDirective;
  
  public isModal:boolean = false;
  @Input("cabin") public cabin: Cabin;
  @Output() refresh = new EventEmitter<boolean>();

  constructor(private rentService: RentService, private toastr: ToastrService) {
   }

  ngOnInit() {
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

  checkout(){
    this.rentService.checkout(this.cabin)
      .subscribe(
          (data) => {
            console.log(data);
            //this.resetValues();
            this.showSuccess();
            this.refreshed();
            this.lgModal.hide();
          },
          (error) => {
            console.info("response error "+JSON.stringify(error,null,4));
            //this.resetValues();
            this.showError();
            this.lgModal.hide();
          }
      );
  }

  refreshed(){
    this.refresh.emit(true);
  }

  showSuccess() {
    this.toastr.success("Salida registrada de la cabina #"+this.cabin.cabin_number, "Exitoso");
  }

  showInfo() {
    this.toastr.info("Salida sin registrar", "Info");
  }

  showError() {
    this.toastr.error("No se pudo registrar la salida", "Error");
  }

}
