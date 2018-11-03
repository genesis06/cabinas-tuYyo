import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { WorkShiftComponent } from './components/work-shift/work-shift.component';
import { ReportComponent } from './components/report/report.component';


import { AuthGuard } from './shared/auth-guard/auth-guard.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';

// Import Containers

export const routes: Routes = [
  { path: '', redirectTo: '/rooms', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'employees', component: EmployeesComponent , canActivate: [AuthGuard]},
  { path: 'rooms', component: RoomsComponent , canActivate: [AuthGuard]},
  { path: 'articles', component: ArticlesComponent, canActivate: [AuthGuard] },
  { path: 'work-shift', component: WorkShiftComponent, canActivate: [AuthGuard] },
  { path: 'report', component: ReportComponent ,canActivate: [AuthGuard]},
  { path: 'dashboard', component: DashboardComponent ,canActivate: [AuthGuard]}
];




@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}