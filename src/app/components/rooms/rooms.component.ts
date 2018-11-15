import { Component, OnInit } from '@angular/core';
import { CabinService } from '../../shared/cabin/cabin.service';
import { Cabin } from '../../models/cabin';
import { RentService } from 'src/app/shared/rent/rent.service';
import { ToastrService } from 'ngx-toastr';
import { VehiculeTypeService } from 'src/app/shared/vehicule-type/vehicule-type.service';
import { VehiculeType } from 'src/app/models/vehicule_type';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
  providers: [CabinService, RentService, VehiculeTypeService]
})
export class RoomsComponent implements OnInit {

  public cabins: Array<Cabin>;
  public lastRents: Array<any>;
  public nextCheckouts: Array<any>;
  public vehicules: Array<VehiculeType>;

  public availables: number;
  public unavailables: number;
  public maintenance: number;

  constructor(private cabinService: CabinService, private rentService: RentService,private vehiculeTypeService: VehiculeTypeService, private toastr: ToastrService) { }

  ngOnInit() {
    this.initDashboard();
    this.getCabins();
    this.getRents();
    this.getVehiculeTypes();
  }

  

  getCabins(){
    this.cabinService.getCabins()
    .subscribe(cabins => {
      this.cabins = cabins
      this.initDashboard();
      this.updateDashboard();
      //console.log(cabins);
    });
  }

  getVehiculeTypes(){
    this.vehiculeTypeService.getVehiculeTypes()
    .subscribe(vehicules => {
      this.vehicules = vehicules
      //console.log(articules);
    },
    (error) => {
      //console.info("response error "+JSON.stringify(error,null,4));
    });
  }


  updateCabin(index: number, status: string){
    let cabin = this.cabins[index];
    cabin.status = status;
    
    this.cabinService.updateCabin(cabin)
    .subscribe(data => {
      this.initDashboard();
      this.updateDashboard();
      this.showInfo("Estado de la cabina #"+cabin.cabin_number+" actualizado");
    });
  }


  initDashboard(){
    this.availables = 0;
    this.unavailables = 0;
    this.maintenance = 0;
  }

  updateDashboard(){
    this.cabins.forEach(cabin =>{
      if(cabin.status == 'available'){
        this.availables += 1;
      }
      else if(cabin.status == 'unavailable'){
        this.unavailables += 1;
      }
      else if(cabin.status == 'maintenance'){
        this.maintenance += 1;
      }
    })
  }

  getRents(){
    
    this.rentService.getRents()
      .subscribe(
          (rents) => {
            this.lastRents = rents;
            //console.log(rents);
          },
          (error) => {
              console.info("response error "+JSON.stringify(error,null,4));
          }
      );
  }

  getNextCheckouts(){

    let fromDate = this.initFromDate();//'2018-11-01T06:00:00.000Z';
    let toDate = this.initToDate();//'2018-11-01T07:00:00.000Z';
    
    this.rentService.getNextCheckouts(fromDate, toDate)
      .subscribe(
          (rents) => {
            this.nextCheckouts = rents;
            if(this.nextCheckouts.length == 0){
              this.showInfo("No se visualizan salidas en la última hora");
            }
            //console.log(rents);
          },
          (error) => {
              console.info("response error "+JSON.stringify(error,null,4));
          }
      );
  }

  initFromDate(){
    let current = new Date();
    current.setSeconds(0,0);

    let date = JSON.stringify(current).toString();
    return date.substring(1,date.length-1); //Remove "" characters
  }

  initToDate(){
    let current = new Date();
    current.setMinutes(current.getMinutes()+30,59,59);

    let date = JSON.stringify(current).toString();
    return date.substring(1,date.length-1); //Remove "" characters
  }

  onRefreshCabins(refresh){

    if(refresh){
     this.getCabins();
    }
  }
  
  onRefreshLastRents(refresh){
    if(refresh){
     this.getRents();
    }
  }

  onRefresh(refresh){
    if(refresh){
      this.getCabins();
      this.getRents();
     }
  }

  showInfo(message: string) {
    this.toastr.info(message, "Info");
  }

}
