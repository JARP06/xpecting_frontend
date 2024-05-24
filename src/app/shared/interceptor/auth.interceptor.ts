import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {  tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (request.url.includes('auth')) {
      const modURL = request.clone({
        headers: request.headers.append('sessionId', 'bfgbfgbfgbf'),
      });

      // get response
      return next.handle(modURL).pipe(
        tap((event) => {
           
        })
      );
    }

    const modifiedReq = request.clone({
      headers: request.headers.append('auth', 'abcxyz'),
    });

     
    return next.handle(modifiedReq).pipe(
      tap((event) => {
        if (event.type === HttpEventType.Response) {
           
          //  
        }
      })
    );
}
}
