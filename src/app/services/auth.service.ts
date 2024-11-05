import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface LoginRequest {
  orgId?: number; // Add orgId if it's needed in the request
  empUsername: string;
  empPassword: string;
  
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false; // Track login status
  private apiUrl = 'http://localhost:8082/api/employee/login'; // Ensure this matches your backend
  private bUrl='http://localhost:8082/api/organization';



  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    return this.loggedIn; // Return the login state
  }

  setLoggedIn(value: boolean): void {
    this.loggedIn = value;
  }

  loginEmployee(loginRequest: LoginRequest): Observable<any> {
    return this.http.post(this.apiUrl, loginRequest)
      
  }
  getOrganizations(): Observable<{ orgId: number, orgName: string }[]> {
    return this.http.get<{ orgId: number, orgName: string }[]>(`${this.bUrl}/all-orgs`)
     
}

}




