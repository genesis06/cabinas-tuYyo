import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from './shared/auth-guard/auth-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthGuard]
})
export class AppComponent {
  title = 'cabinas-tuYyo';

  constructor(public router: Router, public authGuard: AuthGuard){}

  showHide(){
    return this.authGuard.loggedIn();
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
