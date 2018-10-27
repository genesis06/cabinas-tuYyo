import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Rent } from 'src/app/models/rent';
import { RentService } from 'src/app/shared/rent/rent.service';
import { Cabin } from 'src/app/models/cabin';

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

  constructor(private rentService: RentService) {
   }

  ngOnInit() {
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

  checkout(){
    this.rentService.checkout(this.cabin)
      .subscribe(
          (data) => {
            console.log(data);
            //this.resetValues();
            this.refreshed();
            this.hideModal();
          },
          (error) => {
              console.info("response error "+JSON.stringify(error,null,4));
              //this.resetValues();
             this.hideModal();
          }
      );
  }

  refreshed(){
    this.refresh.emit(true);
  }

}
