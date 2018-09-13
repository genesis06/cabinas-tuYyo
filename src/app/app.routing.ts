import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

// Import Containers

export const routes: Routes = [
 { path: '', redirectTo: '/login', pathMatch: 'full'},
 { path: 'login', component: LoginComponent }
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}