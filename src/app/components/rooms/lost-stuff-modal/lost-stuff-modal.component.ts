import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'lost-stuff-modal',
  templateUrl: './lost-stuff-modal.component.html',
  styleUrls: ['./lost-stuff-modal.component.css']
})
export class LostStuffModalComponent implements OnInit {
  @ViewChild('lgModal') public lgModal:ModalDirective;
  
  public isModal:boolean = false;

  constructor() {
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

 
}
