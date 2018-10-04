import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'add-income-modal',
  templateUrl: './add-income-modal.component.html',
  styleUrls: ['./add-income-modal.component.css']
})
export class AddIncomeModalComponent implements OnInit {
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
