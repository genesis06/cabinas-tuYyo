import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Rent } from '../../../models/rent';
import { RentService } from '../../../shared/rent/rent.service';
import { Vehicule } from 'src/app/models/vehicule';
import * as _ from "lodash";
import { ToastrService } from 'ngx-toastr';
import { VehiculeType } from 'src/app/models/vehicule_type';

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
  @Input('vehiculeTypes') public vehiculeTypes: Array<VehiculeType>;
  public rent = new Rent();

  public vehicules: Array<Vehicule> = [];
  public contractedTimes: Array<number> = [2, 3, 12];

  public isLoading: boolean = false;

  constructor(private rentService: RentService, private toastr: ToastrService) {
   }

  ngOnInit() {
    
  }


  hideModal(){
    this.lgModal.hide();
    this.showInfo("Información sin actualizar");
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
              if(error.status ==409){
                this.showInfo("La cabina no se encuentra alquilada");
              }
              else{
                this.showError("No se pudo obtener información del alquiler");
              }
              this.resetValues();
          }
      );
  }

  isDisabled(){
    return this.isLoading;
  }

  updateRent(){
    //console.log(this.rent);
    //console.log(this.vehicules);
    
    
    //console.log(this.rent.vehicules);

    if( this.validVehicules()){

      this.updateVehicules();
      this.isLoading = true;
      this.rentService.updateRent(this.rent)
      .subscribe(
          (data) => {
            //console.log(data);
            this.showSuccess();
            this.resetValues();
            this.lgModal.hide();
            this.isLoading = false;
          },
          (error) => {
              //console.info("response error "+JSON.stringify(error,null,4));
              
              this.showError("No se pudo actualizar la información");
              
              this.resetValues();
              this.lgModal.hide();
              this.isLoading = false;
          }
      );
    }
    
    
  }

  validVehicules(){
    let valid = true;


    if(this.vehicules.length == 0 ){
      valid = false;
      this.showWarning("Se requiere al menos 1 tipo de vehículo registrado.");
    }
    else if(this.vehicules.length >= 1  ){  
      
      for (let index = 0; index < this.vehicules.length; index++) {

        if(this.vehicules[index].type == 0){
          this.showWarning("Los campos de tipo de vehículo son obligatorios.");
          valid = false;
          break;
        }
        
      }
    }

    return valid;
  }

  addVehicule(){
    this.vehicules.push( new Vehicule(0,"", false));
  }

  removeVehicule(index: number, id:number){
    if(id == undefined){
      console.log("undefined");
      this.vehicules.splice(index,1); // deletes new one
    }
    else{
      console.log("deleted true");
      this.vehicules[index].deleted = true; //needs to be deleted on db
    }
    
  }

  addVehiculeType(index: number, typeID: number){
    this.vehicules[index].type = typeID;
  }

  getVehiculeType(typeID){
    let typeName = "";

    for (let index = 0; index < this.vehiculeTypes.length; index++) {
      if(this.vehiculeTypes[index].id == typeID){
        typeName = this.vehiculeTypes[index].name;
        break;
      }
    }

    return typeName;
  }

  changeTime(index: number){
    this.rent.contracted_time = this.contractedTimes[index];
  }

  updateVehicules(){
    this.rent.vehicules = this.vehicules;
  }

  resetValues(){
    this.vehicules = [];
    this.isLoading = false;
  }

  showSuccess() {
    this.toastr.success("Información de alquiler actualizada", "Exitoso");
  }

  showWarning(message: string) {
    this.toastr.warning(message, "Advertencia");
  }

  showInfo(message: string) {
    this.toastr.info(message, "Info");
  }

  showError(message: string) {
    this.toastr.error(message, "Error");
  }

 
}
