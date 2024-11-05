import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PortService } from './port.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private _port=this._portService.port

  private _baseUrl = `http://localhost:${this._port}/api/project/`
  

  constructor(private _http: HttpClient,private _portService:PortService) {}

  //raise-ticket
  getProjects(empUsername): Observable<any> {
    return this._http.get(`${this._baseUrl}get-projects-by-empUsername/${empUsername}`); // Ensure this endpoint is correct
  }


}






