import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../shared/login/login.service';
import { User } from '../../models/user';
import { Config } from '../../shared/config';
import { AuthGuard } from '../../shared/auth-guard/auth-guard.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  public user: User;

  constructor(private router: Router, public authGuard: AuthGuard, private loginService: LoginService, private toastr: ToastrService) { }

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
            //console.log(data.json().token)
            localStorage.setItem(Config.TOKEN_KEY, data.json().token);
            this.router.navigate(['/rooms']);
            this.showSuccess();
              
          },
          (error) => {
              if(error.status == 401){
                this.showError("Usuario no autorizado", "Advertencia");
              }
              else{
                this.showError("Ocurrio un error en la autenticación", "");
              }
              //console.log(error.status)
             // console.info("response error "+JSON.stringify(error,null,4));
          }
      );
    } 
    else {
      this.showInfo();
      //console.log("empty fields");
    }
    
  }

  showSuccess() {
    this.toastr.success(this.authGuard.getCurrentUserFirstname(), "Bienvenido");
  }

  showInfo(){
    this.toastr.info("Complete la información solicitada", "Campos vacíos");
  }

  showError(message: string, title: string) {
    this.toastr.warning(message, title);
  }

}
