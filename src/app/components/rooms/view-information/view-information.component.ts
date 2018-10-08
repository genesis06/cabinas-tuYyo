import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Rent } from '../../../models/rent';
import { Vehicule } from '../../../models/vehicule';
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
  public vehicules: Array<Vehicule> = [];

  constructor(private rentService: RentService) {
   }

  ngOnInit() {
    this.rent = new Rent();
    this.rent.observations = "hola";
    console.log("init");
  }


  hideModal(){
    this.lgModal.hide();
  }

  public showModal():void {
    this.isModal = true;
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
            this.rent.observations = data["observations"];
            console.log("sucess");
            this.setValues();
            this.resetValues();
            //this.hideModal();
          },
          (error) => {
              console.info("response error "+JSON.stringify(error,null,4));
              this.resetValues();
             // this.hideModal();
          }
      );
  }

  setValues(){
    console.log(this.rent)
  }


  resetValues(){
    this.vehicules = [];
    this.rent = new Rent();
  }

 
}
