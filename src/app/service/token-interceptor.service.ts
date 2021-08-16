import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService {
  constructor(/*private injector: Injector,*/ private router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    //const authService = this.injector.get(LoginService)
    //const token = authService.loggedIn();
    const token = sessionStorage.getItem('token');
    // console.log(token);
    if (token !== 'undefined') {
      var method = request.url.split('/');
      // console.log(method[method.length-1]);
      if (method[method.length - 1] != 'login')
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });

      // console.log('-----------------' + token);
    }
    // if(method[method.length - 1] != 'login'){

    // }
    return next.handle(request).pipe(
      tap(
        () => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              sessionStorage.removeItem('token');
              sessionStorage.removeItem('authorities');
              sessionStorage.removeItem('username');
              this.router.navigate(['login']);
            } else if (err.status === 403) {
              this.router.navigate(['accessdenied']);
            }
          }
        }
      )
    );
  }
}