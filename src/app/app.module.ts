import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule }    from '@angular/common/http';
import { AppRoutingModule } from './app.routing';
import { JwtModule } from '@auth0/angular-jwt';
import { ModalModule} from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { AuthGuard } from './shared/auth-guard/auth-guard.service';
import { AddRentModalComponent } from './components/rooms/add-rent-modal/add-rent-modal.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { BuyModalComponent } from './components/articles/buy-modal/buy-modal.component';
import { WorkShiftComponent } from './components/work-shift/work-shift.component';
import { AddWorkShiftModalComponent } from './components/work-shift/add-work-shift-modal/add-work-shift-modal.component';
import { ViewInformationComponent } from './components/rooms/view-information/view-information.component';
import { LostStuffModalComponent } from './components/rooms/lost-stuff-modal/lost-stuff-modal.component';
import { CheckoutModalComponent } from './components/rooms/checkout-modal/checkout-modal.component';
import { ReportComponent } from './components/report/report.component';
import { EditWorkShiftModalComponent } from './components/work-shift/edit-work-shift-modal/edit-work-shift-modal.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeesComponent,
    RoomsComponent,
    AddRentModalComponent,
    ArticlesComponent,
    BuyModalComponent,
    WorkShiftComponent,
    AddWorkShiftModalComponent,
    ViewInformationComponent,
    LostStuffModalComponent,
    CheckoutModalComponent,
    ReportComponent,
    EditWorkShiftModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ModalModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3001']
        //blacklistedRoutes: ['localhost:3001/auth/']
      }
    })
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
