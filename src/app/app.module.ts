import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './components/employee/employee.component'; // Adjust path as needed
import { AppRoutingModule } from './app-routing.module';
import { ClosedTicketComponent } from './components/closed-ticket/closed-ticket.component';
import { PendingTicketsComponent } from './components/pending-tickets/pending-tickets.component';
import { AssignedTicketsComponent } from './components/assigned-tickets/assigned-tickets.component';
import { RaiseTicketsComponent } from './components/raise-tickets/raise-tickets.component';
import { DeveloperdashboardComponent } from './components/developerdashboard/developerdashboard.component';
import { TesterdashboardComponent } from './components/testerdashboard/testerdashboard.component';
import { HomeComponent } from './components/home/home.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TicketService } from './services/ticket.service'; // Ensure your service path is correct
import { ProjectService } from './services/project.service'; // Ensure your service path is correct
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TeamLeaddashboardComponent } from './components/team-leaddashboard/team-leaddashboard.component';
import { ProjectsComponent } from './components/projects/projects.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    ClosedTicketComponent,
    PendingTicketsComponent,
    AssignedTicketsComponent,
    RaiseTicketsComponent,
    DeveloperdashboardComponent,
    TesterdashboardComponent,
    HomeComponent,
    TeamLeaddashboardComponent,
    ProjectsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,  
      progressBar: true,
      easeTime: 300,
      preventDuplicates: true,
      positionClass:'toast-top-left'
    }),
  ],
  providers: [
    TicketService, // Provide the TicketService here
    ProjectService, // Provide the ProjectService here
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } // Correctly provide the AuthInterceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
