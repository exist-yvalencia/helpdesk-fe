import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { HttpInterceptorService } from './http-interceptor.service';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { ModuleActionsComponent } from './module-actions/module-actions.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { TicketAddComponent } from './ticket-add/ticket-add.component';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { NgToastModule } from 'ng-angular-popup';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { TicketViewComponent } from './ticket-view/ticket-view.component';
import { TicketUpdateComponent } from './ticket-update/ticket-update.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {NgxPaginationModule} from 'ngx-pagination';
import { AccountAddComponent } from './account-add/account-add.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeeListComponent,
    TicketListComponent,
    HomeComponent,
    LogoutComponent,
    ModuleActionsComponent,
    EmployeeAddComponent,
    TicketAddComponent,
    EmployeeViewComponent,
    EmployeeUpdateComponent,
    TicketViewComponent,
    TicketUpdateComponent,
    AccountAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MdbModalModule,
    NgToastModule,
    NgbPagination,
    NgMultiSelectDropDownModule,
    NgxPaginationModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, multi: true, useClass: HttpInterceptorService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
