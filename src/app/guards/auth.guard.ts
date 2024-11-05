import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.authService.isLoggedIn(); // Adjust this based on your auth service
    if (!isLoggedIn) {
      this.router.navigate(['/employee']); // Redirect to login if not logged in
    }
    return isLoggedIn;
  }
  
  
}



 