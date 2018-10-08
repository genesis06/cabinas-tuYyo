import { Component, OnInit } from '@angular/core';
import { ArticuleService } from '../../shared/articule/articule.service';
import { Articule } from '../../models/articule';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  public articules: Array<Articule>;

  constructor(private articuleService: ArticuleService) { }

  ngOnInit() {
    this.getArticules();
  }

  getArticules(){
    this.articuleService.getArticules()
    .subscribe(articules => {
      this.articules = articules
      console.log(articules);
    });
  }
}
