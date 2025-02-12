import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { RentService } from 'src/app/shared/rent/rent.service';
import { Rent } from 'src/app/models/rent';
import * as _ from "lodash";
import { Vehicule } from 'src/app/models/vehicule';
import { ToastrService } from 'ngx-toastr';

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
  

  constructor(private rentService: RentService, private toastr: ToastrService) {
   }

  ngOnInit() {
    this.getVehicules();
    //console.log(this.rent);
  }

  getVehicules(){
    this.rentService.getVehicules(this.oldRent.id)
    .subscribe(vehicules => {
      this.vehicules = vehicules;
    });
  }


  hideModal(){
    this.lgModal.hide();
    this.showInfo();
  }

  public showModal():void {
    this.isModal = true;
    this.rent = _.cloneDeep(this.oldRent);
  }

  public onHidden():void {
    this.isModal = false;
  }

  validVehicules(){
    let valid = true;


    if(this.vehicules.length == 0 ){
      valid = false;
      this.showWarning("Se requiere al menos 1 tipo de vehículo registrado.");
    }
    else if(this.vehicules.length >= 1  ){  
      
      for (let index = 0; index < this.vehicules.length; index++) {

        if(this.vehicules[index].type == "" ){
          this.showWarning("Los campos de tipo de vehículo son obligatorios.");
          valid = false;
          break;
        }
        
      }
    }

    return valid;
  }

  addVehicule(){
    this.vehicules.push( new Vehicule("","", false));
  }

  removeVehicule(index: number, id:number){
    if(id == undefined){
      this.vehicules.splice(index,1); // deletes new one
    }
    else{
      this.vehicules[index].deleted = true; //needs to be deleted on db
    }
    
  }

  updateVehicules(){
    this.rent.vehicules = this.vehicules;
  }

  postLostStuff(){

    if( this.validVehicules()){

      this.updateVehicules();
      //console.log(this.rent.vehicules);
      this.rentService.postLostStuff(this.rent)
        .subscribe(
            (data) => {
              //console.log(data);
              //this.resetValues();
              this.showSuccess();
              this.refreshed();
              this.lgModal.hide();
            },
            (error) => {
              //console.info("response error "+JSON.stringify(error,null,4));
                //this.resetValues();
              this.showError();
              this.lgModal.hide();
            }
        );
    }
  }

  refreshed(){
    this.refresh.emit(true);
  }

  showSuccess() {
    this.toastr.success("Información de alquiler actualizada", "Exitoso");
  }

  showWarning(message: string) {
    this.toastr.warning(message, "Advertencia");
  }

  showInfo() {
    this.toastr.info("Información sin actualizar", "Info");
  }

  showError() {
    this.toastr.error("No se pudo actualizar la información", "Error");
  }
 
}
