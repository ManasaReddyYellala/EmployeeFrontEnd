import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-assigned-tickets',
  templateUrl: './assigned-tickets.component.html',
  styleUrls: ['./assigned-tickets.component.css']
})
export class AssignedTicketsComponent implements OnInit {
  // Sample data for assigned tickets
  tickets 
  empUsername
  empRole
  constructor(private _router:Router,private _ticketService:TicketService,
    private _toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.empRole=localStorage.getItem('empRole')
    const path= this._router.url.split('/')
    if(path.length>1){
      this.empUsername=path[2]
      this._ticketService.getTicketsByEmpUsername(this.empUsername,'all').subscribe(res=>{
        if(res){
          this.tickets=res.filter(ticket=>ticket.ticketClosedTime==null)
        }
      })
    }
  }
  setTargetCompletionTime(id, selectedDate): void {
    if (!selectedDate) {
        this._toastrService.error('Please select a date.', 'Failed');
        return;
    }
  
    const ticket = {
      ticketId: id,
      ticketClosedTime: selectedDate  // No need for .value as selectedDate is a direct string
    };

    // Call the service method to save the target resolution time
    this._ticketService.setTargetResolutionTime(ticket).subscribe(
      res => {
        if (res) {
          this._toastrService.success('Selected Estimation date', 'Success');
        } else {
          this._toastrService.error('Try again!!!', 'Failed');
        }
      },
      error => {
        console.error('Error:', error);
        this._toastrService.error('Submission failed. Please try again.', 'Error');
      }
    );
}

}










