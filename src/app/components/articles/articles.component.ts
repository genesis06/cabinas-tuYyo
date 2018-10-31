import { Component, OnInit } from '@angular/core';
import { ArticuleService } from '../../shared/articule/articule.service';
import { Articule } from '../../models/articule';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
  providers: [ArticuleService]
})
export class ArticlesComponent implements OnInit {

  public articules: Array<Articule>;

  constructor(private articuleService: ArticuleService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getArticules();
    
  }

  getArticules(){
    this.articuleService.getArticules()
    .subscribe(articules => {
      this.articules = articules
      //console.log(articules);
    },
    (error) => {
      this.showError();
      //console.info("response error "+JSON.stringify(error,null,4));
    });
  }

  showError() {
    this.toastr.error("Ocurrió un error al obtener los artículos de venta", "Error");
  }
}
