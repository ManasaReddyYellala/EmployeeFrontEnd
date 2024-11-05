import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PortService } from './port.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  private _port=this._portService.port

  private _baseUrl = `http://localhost:${this._port}/api/organization/`;

  constructor(private _http: HttpClient,private _portService:PortService) {}

  //tester-dash
  //dev-dash
  //team-lead-dash
  getOrgByEmpId(empId):Observable<any>{
    return this._http.get(`${this._baseUrl}get-org-by/${empId}`)
  }
}
