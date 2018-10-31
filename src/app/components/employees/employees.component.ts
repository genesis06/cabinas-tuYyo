import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user/user.service';
import { User } from '../../models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [UserService]
})
export class EmployeesComponent implements OnInit {

  public users: Array<User>;

  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers()
    .subscribe(users => {
      this.users = users;
      console.log(new Date(users[0].end_time));
      console.log(users);
    },
    (error) => {
      //console.info("response error "+JSON.stringify(error,null,4));
       this.showError();
    });
  }

  showError() {
    this.toastr.error("Ocurrió un error al obtener lista de trabajadores", "Error");
  }

  

}
