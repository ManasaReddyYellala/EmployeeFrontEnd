import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PortService } from './port.service';

@Injectable({
  providedIn: 'root',
})
export class TicketService {

  private _port=this._portService.port
  private _baseUrl = `http://localhost:${this._port}/api/ticket/`;

  constructor(private _http: HttpClient,private _portService:PortService) {}

  raiseTicket(ticketData: any): Observable<any> {
    return this._http.post(`${this._baseUrl}add-ticket`, ticketData, { responseType: 'text' });
 }
 
  getTicketsByEmpUsername(username,status):Observable<any>{
    return this._http.get(`${this._baseUrl}get-tickets-by/${username}/${status}`)
  }

  closeTicket(ticketId):Observable<any>{
    return this._http.delete(`${this._baseUrl}close-ticket/${ticketId}`,{responseType:'text'})
  }

  setTargetResolutionTime(ticket): Observable<any> {
    return this._http.put(`${this._baseUrl}set-closing-date-time`,ticket, {responseType:'text' });
  }

  
}
