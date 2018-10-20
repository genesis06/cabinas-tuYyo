import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { WorkShiftComponent } from './components/work-shift/work-shift.component';
import { ReportComponent } from './components/report/report.component';


import { AuthGuard } from './shared/auth-guard/auth-guard.service';

// Import Containers

export const routes: Routes = [
  { path: '', redirectTo: '/rooms', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'employees', component: EmployeesComponent , canActivate: [AuthGuard]},
  { path: 'rooms', component: RoomsComponent , canActivate: [AuthGuard]},
  { path: 'articles', component: ArticlesComponent },
  { path: 'work-shift', component: WorkShiftComponent },
  { path: 'report', component: ReportComponent }
];




@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}