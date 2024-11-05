import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PortService } from './port.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private _port=this._portService.port

  private _baseUrl = `http://localhost:${this._port}/api/employee/`;
  
  constructor(private _http: HttpClient,private _portService:PortService) {}

  //raise-ticket
  getEmployees(projectId: number): Observable<any> {
    return this._http.get(`${this._baseUrl}get-by-project/${projectId}`);
  }

  //not used
  getRole(username):Observable<any>{
    return this._http.get(`${this._baseUrl}get-role-by/${username}`,{responseType:'text'})
  }




}
