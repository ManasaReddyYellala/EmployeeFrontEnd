import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-closed-tickets',
  templateUrl: './closed-ticket.component.html',
  styleUrls: ['./closed-ticket.component.css']
})
export class ClosedTicketComponent implements OnInit {
  tickets: any[] = []; // Initialize tickets as an empty array
  empUsername: string = '';
  isLoading: boolean = true;
  
  constructor(private _router: Router, private _ticketService: TicketService) {}
  loadClosedTickets(): void {
    this._ticketService.getTicketsByEmpUsername(this.empUsername, 'inactive').subscribe(
      (res) => {
        this.tickets = res;
      },
      (error) => {
        console.error('Error loading closed tickets:', error);
      }
    );
  }
  
  ngOnInit(): void {
    const path = this._router.url.split('/');
    if (path.length > 2) {
        this.empUsername = path[2];
        this._ticketService.getTicketsByEmpUsername(this.empUsername, 'inactive').subscribe(res => {
            if (res) {
                this.tickets = res; // Tickets that are now closed
            }
        });
    }
  }
}
