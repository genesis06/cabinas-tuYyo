import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Rent } from 'src/app/models/rent';
import { RentService } from 'src/app/shared/rent/rent.service';
import { Cabin } from 'src/app/models/cabin';
import { ToastrService } from 'ngx-toastr';
import { VehiculeType } from 'src/app/models/vehicule_type';
import { Vehicule } from 'src/app/models/vehicule';
import * as _ from "lodash";

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
  @Input('vehiculeTypes') public vehiculeTypes: Array<VehiculeType>;
  @Output() refresh = new EventEmitter<boolean>();

  public vehicules: Array<Vehicule> = [];
  public rent = new Rent();

  public isLoading: boolean = false;

  constructor(private rentService: RentService, private toastr: ToastrService) {
   }

  ngOnInit() {
  }


  hideModal(){
    this.lgModal.hide();
    this.showInfo("Salida sin registrar");
    this.isLoading = false;
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
    
    this.rentService.getRent(this.cabin.id)
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

  checkout(){
    this.isLoading = true;
    this.rentService.checkout(this.cabin, this.vehicules)
      .subscribe(
          (data) => {
            //this.resetValues();
            this.showSuccess();
            this.refreshed();
            this.lgModal.hide();
            this.isLoading = false;
          },
          (error) => {
            console.info("response error "+JSON.stringify(error,null,4));
            //this.resetValues();
            if(error.status ==409){
              this.showInfo("La cabina no se encuentra alquilada");
            }
            else{
              this.showError("No se pudo registrar la salida");
            }
            
            this.lgModal.hide();
            this.isLoading = false;
          }
      );
  }

  resetValues(){
    this.vehicules = [];
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

  refreshed(){
    this.refresh.emit(true);
  }

  showSuccess() {
    this.toastr.success("Salida registrada de la cabina #"+this.cabin.cabin_number, "Exitoso");
  }

  showInfo(message: string) {
    this.toastr.info(message, "Info");
  }

  showWarning(message: string) {
    this.toastr.warning(message, "Advertencia");
  }

  showError(message: string) {
    this.toastr.error(message, "Error");
  }

}
