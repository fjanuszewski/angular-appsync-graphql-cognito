import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor() { }
  count = 0;
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request)
      .pipe(tap(

        // event => console.log(event),

        // error => console.log(error)

      ), finalize(() => {

        this.count--;

        // if (this.count == 0) console.log("HTTP Interceptor:",this.count)
      })
      );;

  }
}
