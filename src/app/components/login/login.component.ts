import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../shared/login/login.service';
import { User } from '../../models/user';
import { Config } from '../../shared/config';
import { AuthGuard } from '../../shared/auth-guard/auth-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  public user: User;

  constructor(private router: Router, public authGuard: AuthGuard, private loginService: LoginService) { }

  ngOnInit() {
    this.user = new User();
    this.user.username = "702230639";
    this.user.password = "1993";
  }

  login(){
    if(this.user.username != "" && this.user.password != ""){
      this.loginService.login(this.user)
      .subscribe(
          (data) => {
            console.log(data.json().token)
            localStorage.setItem(Config.TOKEN_KEY, data.json().token);
            this.router.navigate(['/rooms']);
              
          },
          (error) => {
              console.info("response error "+JSON.stringify(error,null,4));
          }
      );
    } 
    else {
      console.log("empty fields");
    }
    
  }

}
