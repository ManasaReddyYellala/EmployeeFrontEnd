import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authToken'); // Get the token from local storage

    if (token) {
      // Clone the request and set the authorization header
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}` // Change as per your backend's requirement
        }
      });
    }

    return next.handle(request); // Pass the modified request to the next handler
  }
}




