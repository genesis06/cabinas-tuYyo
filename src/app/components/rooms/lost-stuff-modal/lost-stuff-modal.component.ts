import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { RentService } from 'src/app/shared/rent/rent.service';
import { Rent } from 'src/app/models/rent';
import * as _ from "lodash";
import { Vehicule } from 'src/app/models/vehicule';

@Component({
  selector: 'lost-stuff-modal',
  templateUrl: './lost-stuff-modal.component.html',
  styleUrls: ['./lost-stuff-modal.component.css'],
  providers: [RentService]
})
export class LostStuffModalComponent implements OnInit {
  @ViewChild('lgModal') public lgModal:ModalDirective;
  
  public isModal:boolean = false;
  public rent: Rent;
  public vehicules: Array<Vehicule>;

  @Input("rent") public oldRent: any;
  @Output() refresh = new EventEmitter<boolean>();
  

  constructor(private rentService: RentService) {
   }

  ngOnInit() {
    this.getVehicules();
    console.log(this.rent);
  }

  getVehicules(){
    this.rentService.getVehicules(this.oldRent.id)
    .subscribe(vehicules => {
      this.vehicules = vehicules;
    });
  }


  hideModal(){
    this.lgModal.hide();
  }

  public showModal():void {
    this.isModal = true;
    this.rent = _.cloneDeep(this.oldRent);
  }

  public onHidden():void {
    this.isModal = false;
  }

  addVehicule(){
    this.vehicules.push( new Vehicule("",""));
  }

  updateVehicules(){
    this.rent.vehicules = this.vehicules;
  }

  postLostStuff(){

    this.updateVehicules();
    console.log(this.rent.vehicules);
    this.rentService.postLostStuff(this.rent)
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
