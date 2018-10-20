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

  public bill1000: number;
  public bill2000: number;
  public bill5000: number;
  public bill10000: number;
  public bill20000: number;
  public bill50000: number;

  constructor() {
   }

  ngOnInit() {
    this.bill1000 = 0;
    this.bill2000 = 10;
    this.bill5000 = 0;
    this.bill10000 = 0;
    this.bill20000 = 0;
    this.bill50000 = 0;
  }

  sumBills(){
    let sumBill1000 = this.bill1000*1000;
    let sumBill2000 = this.bill2000*2000;
    let sumBill5000 = this.bill5000*5000;
    let sumBill10000 = this.bill10000*10000;
    let sumBill20000 = this.bill20000*20000;
    let sumBill50000 = this.bill50000*50000;
    
    return  sumBill1000+ sumBill2000+ sumBill5000+ sumBill10000+ sumBill20000+ sumBill50000;
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
