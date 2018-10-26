import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Vehicule } from '../../../models/vehicule';
import { RentService } from '../../../shared/rent/rent.service';
import { Rent } from '../../../models/rent';

@Component({
  selector: 'add-rent-modal',
  templateUrl: './add-rent-modal.component.html',
  styleUrls: ['./add-rent-modal.component.css'],
  providers: [RentService]
})
export class AddRentModalComponent implements OnInit {

  @ViewChild('lgModal') public lgModal:ModalDirective;
  
  public isModal:boolean = false;

  public contractedTimes: Array<number> = [2, 3, 12];
  public vehicules: Array<Vehicule> = [];
  public checkIn: string;
  public selectedTime: number;

  public rent: Rent;

  @Input('cabin') public cabinID: number;
  @Output() refresh = new EventEmitter<boolean>();

  constructor(private rentService: RentService) {
   }

  ngOnInit() {
    this.addVehicule();
    this.rent = new Rent();
  }


  hideModal(){
    this.lgModal.hide();
    this.resetValues();
  }

  public showModal():void {
    this.isModal = true;
  }

  public onHidden():void {
    this.isModal = false;
  }

  resetValues(){
    this.vehicules = [];
    this.addVehicule();
    //---
    this.selectedTime = undefined;
    this.checkIn = undefined;
    this.rent = new Rent();
  }

  addVehicule(){
    this.vehicules.push( new Vehicule("",""));
  }

  changeTime(index: number){
    this.selectedTime = this.contractedTimes[index];
  }

  getRentInformation(){
    this.rent.cabin_id = this.cabinID;
    this.rent.vehicules = this.vehicules;
    this.rent.contracted_time = this.selectedTime;
    this.rent.check_in = this.getCheckInDate();
    console.log(this.rent);
  }

  getCheckInDate(){
    let date = new Date();

    if(this.checkIn != undefined){
      date.setHours(this.getHours());
      date.setMinutes(this.getMinutes());
    }
    console.log(date);
    return JSON.stringify(date);
  }

  addRent(){
    
    this.getRentInformation();
    this.rentService.createRent(this.rent)
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

  refreshed(){
    this.refresh.emit(true);
  }

  getHours(): number{
    let time = this.checkIn.split(":");
    return Number(time[0]);
  }

  getMinutes(): number{
    let time = this.checkIn.split(":");
    return Number(time[1]);
  }

}
