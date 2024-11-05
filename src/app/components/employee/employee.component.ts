import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService, LoginRequest } from 'src/app/services/auth.service'; // Ensure correct path

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  errorMessage: string = '';  // Variable to store error messages
   organizations: { orgId: number, orgName: string }[] = [];

  constructor(
    private fb: FormBuilder, private authService: AuthService, 
    private router: Router,private _toastrService:ToastrService
  ) {
    // Initialize the form with validation
    this.employeeForm = this.fb.group({
      emporgname: ['', Validators.required],
      empusername: ['', Validators.required],  // Ensure form control names match the template
      emppassword: ['', Validators.required]    // Ensure form control names match the template
    });
  }
  ngOnInit(): void {
    this.authService.getOrganizations().subscribe(
      data => {
        this.organizations = data; // Store organizations
      },
      error => {
        this.errorMessage = 'Failed to load organizations.';
        console.error('Error fetching organizations:', error);
      }
    );
}

  // Getter for easier access to form controls in the template
  get formControls() {
    return this.employeeForm.controls;
  }

  // Method to handle the login action
  onLogin(): void {
    if (this.employeeForm.valid) {
      const emporgname = this.employeeForm.value.emporgname;
      const empUsername = this.employeeForm.value.empusername;
      const empPassword = this.employeeForm.value.emppassword;

      const loginRequest: LoginRequest = { 
        orgId: emporgname,
        empUsername: empUsername,
        empPassword: empPassword
      };
      this.authService.loginEmployee(loginRequest).subscribe(
        res => {          
          if (res) {
            this._toastrService.success('Login successfull','Success')
            localStorage.setItem('empRole',res.empRole)
            localStorage.setItem('empId',res.empId)
            localStorage.setItem('empUsername',loginRequest.empUsername)
            if (res.empRole == 'tester') {
              localStorage.setItem('token',empUsername)
              this.authService.setLoggedIn(true); // Set logged in status
              this.router.navigate(['/tester-dashboard', empUsername]);
            } else if (res.empRole == 'developer') {

              this.authService.setLoggedIn(true); // Set logged in status
              this.router.navigate(['/developer-dashboard', empUsername]);
            }
            else if (res.empRole == 'Teamlead') {

              this.authService.setLoggedIn(true); // Set logged in status
              this.router.navigate(['/team-leaddashboard', empUsername]);
            
            }
          } else {
            this._toastrService.error('Invalid username or password', 'Failed');          }
        });
    }
      

  }
}


    