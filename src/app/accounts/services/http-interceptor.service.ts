import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from './accounts.service';


@Injectable({
    providedIn: 'root'
  })
export class TokenInterceptor implements HttpInterceptor{
    
  
    constructor(public auth: AccountService) {        
    }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({

            setHeaders:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return next.handle(req);
    }

}