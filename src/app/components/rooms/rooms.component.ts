import { Component, OnInit } from '@angular/core';
import { CabinService } from '../../shared/cabin/cabin.service';
import { Cabin } from '../../models/cabin';
import { RentService } from 'src/app/shared/rent/rent.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
  providers: [CabinService, RentService]
})
export class RoomsComponent implements OnInit {

  public cabins: Array<Cabin>;
  public lastRents: Array<any>;

  public availables: number;
  public unavailables: number;
  public maintenance: number;

  constructor(private cabinService: CabinService, private rentService: RentService, private toastr: ToastrService) { }

  ngOnInit() {
    this.initDashboard();
    this.getCabins();
    this.getRents();
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
