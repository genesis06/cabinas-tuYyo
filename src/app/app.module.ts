import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule }    from '@angular/common/http';
import { AppRoutingModule } from './app.routing';

import { ModalModule} from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { AuthGuard } from './shared/auth-guard/auth-guard.service';
import { AddRentModalComponent } from './components/rooms/add-rent-modal/add-rent-modal.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { BuyModalComponent } from './components/articles/buy-modal/buy-modal.component';
import { IncomesComponent } from './components/incomes/incomes.component';
import { AddIncomeModalComponent } from './components/incomes/add-income-modal/add-income-modal.component';
import { ViewInformationComponent } from './components/rooms/view-information/view-information.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeesComponent,
    RoomsComponent,
    AddRentModalComponent,
    ArticlesComponent,
    BuyModalComponent,
    IncomesComponent,
    AddIncomeModalComponent,
    ViewInformationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
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
