import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'add-room-modal',
  templateUrl: './add-room-modal.component.html',
  styleUrls: ['./add-room-modal.component.css']
})
export class AddRoomModalComponent implements OnInit {

  @ViewChild('lgModal') public lgModal:ModalDirective;
  
  public isModal:boolean = false;

  constructor() { }

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

}
