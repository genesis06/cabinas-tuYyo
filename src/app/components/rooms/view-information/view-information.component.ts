import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Rent } from '../../../models/rent';
import { RentService } from '../../../shared/rent/rent.service';

@Component({
  selector: 'view-information',
  templateUrl: './view-information.component.html',
  styleUrls: ['./view-information.component.css'],
  providers: [RentService]
})
export class ViewInformationComponent implements OnInit {
  @ViewChild('lgModal') public lgModal:ModalDirective;
  
  public isModal:boolean = false;

  @Input("cabinID") public cabinID: number;
  public rent = new Rent();

  constructor(private rentService: RentService) {
   }

  ngOnInit() {
    
  }


  hideModal(){
    this.lgModal.hide();
    this.resetValues();
  }

  public showModal():void {
    this.isModal = true;
    this.rent = new Rent();
    this.getRent();
  }

  public onHidden():void {
    this.isModal = false;
  }

  getRent(){
    
    this.rentService.getRent(this.cabinID)
      .subscribe(
          (data) => {
            console.log(data);
            this.rent.setInformation(data);
          },
          (error) => {
              console.info("response error "+JSON.stringify(error,null,4));
              this.resetValues();
          }
      );
  }

  updateRent(){
    this.rentService.updateRent(this.rent)
      .subscribe(
          (data) => {
            console.log(data);
            this.resetValues();
            this.hideModal();
          },
          (error) => {
              console.info("response error "+JSON.stringify(error,null,4));
              this.resetValues();
              this.hideModal();
          }
      );
  }


  resetValues(){
    this.rent = new Rent();
  }

 
}
