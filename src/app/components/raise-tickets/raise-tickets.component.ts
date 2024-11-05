import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProjectService } from 'src/app/services/project.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-raise-tickets',
  templateUrl: './raise-tickets.component.html',
  styleUrls: ['./raise-tickets.component.css'],
})
export class RaiseTicketsComponent implements OnInit {
  raiseTicketForm: FormGroup;
  projects: any[] = [];  // Array to hold the project list
  developers: any[] = []; // Array to hold the developers

  empUsername

  constructor(private _router:Router,private _route:ActivatedRoute,
          private _toastService:ToastrService,private fb: FormBuilder,
          private _ticketService: TicketService,private _projectService:ProjectService,
          private _employeeService:EmployeeService) {
    this.raiseTicketForm = this.fb.group({
      ticketType: [''],
      ticketDescription: [''],
      projectName: [''],
      developerName: [''],
    });
  }

  ngOnInit(): void {
    const paths=this._router.url.split('/')
    if(paths.length>1){
      this.empUsername=paths[2]
      this.getProjects(this.empUsername)
    }
  }

  getProjects(empUsername) {
    this._projectService.getProjects(empUsername).subscribe(
      (data) => {
        this.projects = data; // Store the project data in the projects array
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  onProjectChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const projectId = selectElement.value;
    this._employeeService.getEmployees(+projectId).subscribe(
      (data) => {
        this.developers = data; // Update developers based on selected project
        this.raiseTicketForm.patchValue({ developerName: '' }); // Reset developer selection
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  onSubmit() {
    if (this.raiseTicketForm.valid) {
      const ticketData = {
        ticketType: this.raiseTicketForm.get('ticketType').value,
        ticketDescription: this.raiseTicketForm.get('ticketDescription').value,
        ticketRaisedBy: this.empUsername,
        ticketAssignedTo: this.raiseTicketForm.get('developerName').value,
        status: 'active', // Set initial status as active
        project: {
          projectId: this.raiseTicketForm.get('projectName').value,
        },
      };
  
      this._ticketService.raiseTicket(ticketData).subscribe(res => {
        if (res) {
          this._toastService.success('Ticket raised', 'Success');
          this.raiseTicketForm.reset();
        } else {
          this._toastService.error('Try again!!!', 'Failed');
          this.raiseTicketForm.reset();
        }
      });
    } else {
      this._toastService.error('Invalid form!!!', 'Failed');
      this.raiseTicketForm.reset();
    }
  }
}  