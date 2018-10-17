import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { RentService } from 'src/app/shared/rent/rent.service';

@Component({
  selector: 'lost-stuff-modal',
  templateUrl: './lost-stuff-modal.component.html',
  styleUrls: ['./lost-stuff-modal.component.css'],
  providers: [RentService]
})
export class LostStuffModalComponent implements OnInit {
  @ViewChild('lgModal') public lgModal:ModalDirective;
  
  public isModal:boolean = false;

  public observations: string;

  constructor(private rentService: RentService) {
   }

  ngOnInit() {
  }


  hideModal(){
    this.lgModal.hide();
  }

  public showModal():void {
    this.isModal = true;
  }

  public onHidden():void {
    this.isModal = false;
  }

  postLostStuff(){
    this.rentService.postLostStuff(28, "joyas perdidas")
      .subscribe(
          (data) => {
            console.log(data);
            //this.resetValues();
            this.hideModal();
          },
          (error) => {
              console.info("response error "+JSON.stringify(error,null,4));
              //this.resetValues();
             this.hideModal();
          }
      );
  }

 
}
