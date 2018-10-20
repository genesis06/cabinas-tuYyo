import { Component, OnInit } from '@angular/core';
import { CabinService } from '../../shared/cabin/cabin.service';
import { Cabin } from '../../models/cabin';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
  providers: [CabinService]
})
export class RoomsComponent implements OnInit {

  public cabins: Array<Cabin>;

  public availables: number;
  public unavailables: number;
  public maintenance: number;

  constructor(private cabinService: CabinService) { }

  ngOnInit() {
    this.initDashboard();
    this.getCabins();
  }

  getCabins(){
    this.cabinService.getCabins()
    .subscribe(cabins => {
      this.cabins = cabins
      this.updateDashboard();
      console.log(cabins);
    });
  }


  updateCabin(index: number, status: string){
    let cabin = this.cabins[index];
    cabin.status = status;
    
    this.cabinService.updateCabin(cabin)
    .subscribe(data => {
      this.initDashboard();
      this.updateDashboard();
      console.log(data);
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

  

}
