import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            headers: request.headers.set(
                'X-Request-With', 'XMLHttpRequest'
            ),
            url: request.url.replace('http://localhost:4200', environment.apiUrl)
        })
        const token = sessionStorage.getItem('token');
        if(token && !request.url.includes('login')) {
            request = request.clone({
                headers: request.headers.set(
                    'Authorization', 'Basic '+token
                )
            })
        }
        return next.handle(request);
        
        
    }
    
}