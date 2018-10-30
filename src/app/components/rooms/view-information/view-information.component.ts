import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Rent } from '../../../models/rent';
import { RentService } from '../../../shared/rent/rent.service';
import { Vehicule } from 'src/app/models/vehicule';
import * as _ from "lodash";
import { ToastrService } from 'ngx-toastr';

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
  public contractedTimes: Array<number> = [2, 3, 12];

  constructor(private rentService: RentService, private toastr: ToastrService) {
   }

  ngOnInit() {
    
  }


  hideModal(){
    this.lgModal.hide();
    this.showInfo();
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
            this.rent = data;
            this.vehicules = _.cloneDeep(this.rent.vehicules);
            //console.log(data);
          },
          (error) => {
              //console.info("response error "+JSON.stringify(error,null,4));
              this.resetValues();
          }
      );
  }

  updateRent(){
    //console.log(this.rent);
    //console.log(this.vehicules);
    
    this.updateVehicules();
    //console.log(this.rent.vehicules);
    
    this.rentService.updateRent(this.rent)
      .subscribe(
          (data) => {
            //console.log(data);
            this.showSuccess();
            this.resetValues();
            this.lgModal.hide();
          },
          (error) => {
              //console.info("response error "+JSON.stringify(error,null,4));
              this.showError();
              this.resetValues();
              this.lgModal.hide();
          }
      );
  }

  addVehicule(){
    this.vehicules.push( new Vehicule("",""));
  }

  changeTime(index: number){
    this.rent.contracted_time = this.contractedTimes[index];
  }

  updateVehicules(){
    this.rent.vehicules = this.vehicules;
  }

  resetValues(){
    this.vehicules = [];
  }

  showSuccess() {
    this.toastr.success("Información de alquiler actualizada", "Exitoso");
  }

  showInfo() {
    this.toastr.info("Información sin actualizar", "Info");
  }

  showError() {
    this.toastr.error("No se pudo actualizar la información", "Error");
  }

 
}
