import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-pending-tickets',
  templateUrl: './pending-tickets.component.html',
  styleUrls: ['./pending-tickets.component.css'],
})
export class PendingTicketsComponent implements OnInit {
  tickets: any[] = []; // Array to hold pending tickets
  empUsername: string;
  empRole
  constructor(private _router: Router, private _ticketService: TicketService,
    private _toastrService:ToastrService
  ) {}

  ngOnInit(): void {
    const path = this._router.url.split('/');
    this.empRole=localStorage.getItem('empRole')
    if (path.length > 1) {
      this.empUsername = path[2]; // Get the username from the URL
      this.loadPendingTickets(); // Load pending tickets for the user
    }
  }

  loadPendingTickets(): void {
    this._ticketService.getTicketsByEmpUsername(this.empUsername, 'active').subscribe(
      (res) => {
        this.tickets = res; // Assign the loaded tickets to the tickets array
      }
    );
  }

  closeTicket(ticketId: number): void {
    console.log(ticketId);
    
    this._ticketService.closeTicket(ticketId).subscribe(
      res => {
        if(res){
          this._toastrService.success('Ticket closed successfully','Success')
          this.loadPendingTickets(); // Reload pending tickets after closing
        }else{
          this._toastrService.error('Try again!!!','Failed')
        }})
  }
}
