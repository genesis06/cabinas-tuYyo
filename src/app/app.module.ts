import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app.routing';

import { ModalModule} from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { AuthGuard } from './shared/auth-guard/auth-guard.service';
import { AddRoomModalComponent } from './components/rooms/add-room-modal/add-room-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeesComponent,
    RoomsComponent,
    AddRoomModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
    ModalModule.forRoot()
  ],
  providers: [
    AuthGuard,
    {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
