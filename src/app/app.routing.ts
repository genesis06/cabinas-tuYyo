import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { RoomsComponent } from './components/rooms/rooms.component';

// Import Containers

export const routes: Routes = [
 { path: '', redirectTo: '/login', pathMatch: 'full'},
 { path: 'login', component: LoginComponent },
{ path: 'employees', component: EmployeesComponent },
{ path: 'rooms', component: RoomsComponent }
  
];




@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}