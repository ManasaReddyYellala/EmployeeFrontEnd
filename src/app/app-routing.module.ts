import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './components/employee/employee.component';
import { ClosedTicketComponent } from './components/closed-ticket/closed-ticket.component';
import { PendingTicketsComponent } from './components/pending-tickets/pending-tickets.component';
import { AssignedTicketsComponent } from './components/assigned-tickets/assigned-tickets.component';
import { RaiseTicketsComponent } from './components/raise-tickets/raise-tickets.component';
import { TesterdashboardComponent } from './components/testerdashboard/testerdashboard.component';
import { DeveloperdashboardComponent } from './components/developerdashboard/developerdashboard.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard'; // Adjust the path as needed
import { ProjectsComponent } from './components/projects/projects.component';
import { TeamLeaddashboardComponent } from './components/team-leaddashboard/team-leaddashboard.component';

const routes: Routes = [
  {
    path: 'employee', component: EmployeeComponent
  },
  {
    path: 'tester-dashboard/:username', component: TesterdashboardComponent, children: [
      { path: 'home', component: HomeComponent },
      { path: 'raise-tickets', component: RaiseTicketsComponent },
      { path: 'assigned-tickets', component: AssignedTicketsComponent },
      { path: 'pending-tickets', component: PendingTicketsComponent },
      { path: 'closed-ticket', component: ClosedTicketComponent },
     
    ]
  },
  {
    path: 'developer-dashboard/:username', component: DeveloperdashboardComponent, children: [
      { path: 'home', component: HomeComponent },
      { path: 'assigned-tickets', component: AssignedTicketsComponent },
      { path: 'pending-tickets', component: PendingTicketsComponent },
      { path: 'closed-ticket', component: ClosedTicketComponent }
    ]
  },
  {
    path:'team-leaddashboard/:username',component:TeamLeaddashboardComponent, children:[
      { path: 'home', component: HomeComponent },
      {path:'projects',component:ProjectsComponent}
    ]
  },
  { path: '', redirectTo: '/employee', pathMatch: 'full' },
  { path: '**', redirectTo: '/employee' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }











