import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Vehicule } from '../../../models/vehicule';
import { RentService } from '../../../shared/rent/rent.service';
import { Rent } from '../../../models/rent';
import { ToastrService } from 'ngx-toastr';
import { Cabin } from 'src/app/models/cabin';
import { VehiculeType } from 'src/app/models/vehicule_type';

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

  public isLoading: boolean = false;

  @Input('cabin') public cabin: Cabin;
  @Input('vehiculeTypes') public vehiculeTypes: Array<VehiculeType>;
  @Output() refresh = new EventEmitter<boolean>();

  constructor(private rentService: RentService, private toastr: ToastrService) {
   }

  ngOnInit() {
    this.addVehicule();
    this.rent = new Rent();
    
  }


  hideModal(){
    this.lgModal.hide();
    this.showInfo();
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
    this.isLoading = false;
  }

  addVehicule(){
    this.vehicules.push( new Vehicule(0,"", false));
  }

  removeVehicule(index: number){
    this.vehicules.splice(index,1); 
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
    this.selectedTime = this.contractedTimes[index];
  }

  getRentInformation(){
    this.rent.cabin_id = this.cabin.id;
    this.rent.vehicules = this.vehicules;
    this.rent.contracted_time = this.selectedTime;
    this.rent.check_in = this.getCheckInDate();
    this.rent.estimated_checkout = this.getEstimatedCheckout();
    //console.log(this.rent);
  }

  getCheckInDate(){
    let date = new Date();

    if(this.checkIn != undefined){
      date.setHours(this.getHours());
      date.setMinutes(this.getMinutes());
    }
    //console.log(date);
    return JSON.stringify(date);
  }

  getEstimatedCheckout(){
    let date = new Date();
    return JSON.stringify(new Date(date.setHours(date.getHours()+this.rent.contracted_time)));
  }

  isDisabled(){
    return this.isLoading;
  }

  addRent(){

    this.isLoading = true;

    let areValidFields = this.validateFields();
    
    if( areValidFields ){
      this.getRentInformation();
      this.rentService.createRent(this.rent)
      .subscribe(
          (data) => {
            //console.log(data);
            this.resetValues();
            this.refreshed();
            this.showSuccess();
            this.lgModal.hide();
            this.isLoading = false;
          },
          (error) => {
              //console.info("response error "+JSON.stringify(error,null,4));
              this.resetValues();
              this.lgModal.hide();
              this.showError();
              this.isLoading = false;
          }
      ); 
    }
  }

  validateFields(){
    let valid = true;

    if(this.invalidVehicules() && this.selectedTime == undefined){
      this.showWarning("Se requiere los campos de tipo de vehículo y el tiempo contratado.");  valid = false;
    }
    else if( this.invalidVehicules() ){
      this.showWarning("Se requiere al menos 1 tipo de vehículo registrado."); 
      valid = false;
    }
    else if(this.selectedTime == undefined){
      this.showWarning("Se requiere ingresar el tiempo contratado"); 
      valid = false;
    }
    //console.log(this.selectedTime);
    return valid;
  }

  invalidVehicules(){
    let invalid = false;

    if(this.vehicules.length == 0 ){
      invalid = true;
    }
    else if(this.vehicules.length == 1 && this.vehicules[0].type == 0){
      invalid = true;
    }
    else if(this.vehicules.length >= 1  ){  
      
      for (let index = 0; index < this.vehicules.length; index++) {

        if(this.vehicules[index].type == 0){
          invalid = true;
          break;
        }
        
      }
    }

    return invalid;
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

  showSuccess() {
    this.toastr.success("Cabina #"+this.cabin.cabin_number+" alquilada", "Exitoso");
  }

  showWarning(message: string) {
    this.toastr.warning(message, "Advertencia");
  }

  showInfo() {
    this.toastr.info("Alquiler sin realizar", "Info");
  }

  showError() {
    this.toastr.error("No se pudo realizar el alquiler", "Error");
  }

}
