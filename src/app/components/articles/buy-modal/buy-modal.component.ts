// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Articule } from 'src/app/models/articule';
import { SaleService } from 'src/app/shared/sale/sale.service';
import { SaleArticule } from 'src/app/models/sale_articule';

@Component({
  selector: 'buy-modal',
  templateUrl: './buy-modal.component.html',
  styleUrls: ['./buy-modal.component.css'],
  providers:[SaleService]
})
export class BuyModalComponent implements OnInit {

  @ViewChild('lgModal') public lgModal:ModalDirective;
  
  public isModal:boolean = false;
  public amount: number = 1;

  @Input('articules') public articules: Array<Articule>;
  @Output() refresh = new EventEmitter<boolean>();

  public selectedArticule: Articule;

  constructor(private saleService: SaleService) { }

  ngOnInit() {
    
  }


  hideModal(){
    this.lgModal.hide();
    
  }

  public showModal():void {
    this.selectedArticule = this.articules[0];
    this.isModal = true;
  }

  public onHidden():void {
    this.isModal = false;
  }

  changeArticule(index: number){
    console.log(this.articules[index].name);
    this.selectedArticule = this.articules[index];
    
  }

  saleArticule(){
    let articules = new SaleArticule(this.selectedArticule.id, this.amount, this.selectedArticule.price * this.amount);
    this.saleService.saleArticule([articules])
      .subscribe(
          (data) => {
            console.log(data);
            //this.resetValues();
            this.hideModal();
          },
          (error) => {
              console.info("response error "+JSON.stringify(error,null,4));
             // this.resetValues();
              this.hideModal();
          }
      );
  }

}

