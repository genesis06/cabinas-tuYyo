// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Articule } from 'src/app/models/articule';
import { SaleService } from 'src/app/shared/sale/sale.service';
import { SaleArticule } from 'src/app/models/sale_articule';
import { ToastrService } from 'ngx-toastr';

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

  public isLoading: boolean = false;

  constructor(private saleService: SaleService, private toastr: ToastrService) { }

  ngOnInit() {
    
  }


  hideModal(){
    this.lgModal.hide();
    this.showInfo();
  }

  public showModal():void {
    this.selectedArticule = this.articules? this.articules[0] : new Articule(0,"",0);
    this.isModal = true;
  }

  public onHidden():void {
    this.isModal = false;
  }

  changeArticule(index: number){
    //console.log(this.articules[index].name);
    this.selectedArticule = this.articules[index];
    
  }

  isDisabled(){
    return this.isLoading;
  }

  saleArticule(){
    let articules = new SaleArticule(this.selectedArticule.id, this.amount, this.selectedArticule.price * this.amount);
    this.isLoading = true;
    this.saleService.saleArticule([articules])
      .subscribe(
          (data) => {
            //console.log(data);
            this.showSuccess();
            this.lgModal.hide();
            this.isLoading = false;
          },
          (error) => {
            //console.info("response error "+JSON.stringify(error,null,4));
             this.showError();
             this.lgModal.hide();
             this.isLoading = false;
          }
      );
      this.resetValues();
  }

  resetValues(){
    this.amount = 1;
  }

  showSuccess() {
    this.toastr.success("Venta de "+this.selectedArticule.name+" realizada", "Exitoso");
  }

  showInfo() {
    this.toastr.info("Venta sin realizar", "Info");
  }

  showError() {
    this.toastr.error("No se pudo realizar la venta", "Error");
  }

}

