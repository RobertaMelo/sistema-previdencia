import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let requestToAPI = req.url.startsWith(API_CONFIG.baseUrl);
        if (requestToAPI) {
            const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer 8f23214d5a05b045a8d6d1827080d3f6aea4759c9cad7d56595')});
            console.log(authReq)
            return next.handle(authReq);
        }

        return next.handle(req)
    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};