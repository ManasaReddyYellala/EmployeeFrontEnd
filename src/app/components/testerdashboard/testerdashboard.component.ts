import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationService } from 'src/app/services/organization.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-testerdashboard',
  templateUrl: './testerdashboard.component.html',
  styleUrls: ['./testerdashboard.component.css']
})
export class TesterdashboardComponent implements OnInit {
  
  empId
  empUsername
  sidebarActive: boolean = false;
  org;
  orgImg
  
  
  constructor(private route: ActivatedRoute, private router: Router,
          private _ticketService:TicketService,private _organizationService:OrganizationService
  ) { }
  ngOnInit() {
    this.empId=localStorage.getItem('empId')
    this.empUsername=localStorage.getItem('empUsername')
      // Show success message when navigating to dashboard
      this._organizationService.getOrgByEmpId(this.empId).subscribe(res=>{
        this.org=res
        this.orgImg='data:'+this.org.orgImagePath+';base64,'+this.org.orgImage
      })
  }

  toggleSidebar() {
    this.sidebarActive = !this.sidebarActive;
  }
  closeSidebar() {
    this.sidebarActive = false; // Close the sidebar
}

  logout() {
    // Clear any session or authentication tokens if needed
    this.router.navigate(['/employee']).then(() => {
      window.location.replace('/employee'); // Clear history and redirect to login page
    });
  
}
}
