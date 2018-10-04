import { Component, OnInit } from '@angular/core';
import { CabinService } from '../../shared/cabin/cabin.service';
import { Cabin } from '../../models/cabin';
import { Console } from '@angular/core/src/console';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
  providers: [CabinService]
})
export class RoomsComponent implements OnInit {

  public cabins: Array<Cabin>;

  constructor(private cabinService: CabinService) { }

  ngOnInit() {
    this.getCabins();
    let c = JSON.stringify(new Date());
    console.log(new Date(JSON.parse(c)));
  }

  getCabins(){
    this.cabinService.getCabins()
    .subscribe(cabins => {
      this.cabins = cabins
      console.log(cabins);
    });
  }

  updateCabin(index: number, status: string){
    let cabin = this.cabins[index];
    cabin.status = status;
    
    this.cabinService.updateCabin(cabin)
    .subscribe(data => {
      console.log(data);
    });
  }

}
