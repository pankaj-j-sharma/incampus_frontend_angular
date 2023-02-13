import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('intercepted ->',req.url,' sent with data',req.body);

    /* Custom Interceptor code for testing purpose */
    // if (req.url.endsWith('/getmenuitem')){
    //   let navSideBarItemArr =  navSideBarItem.filter(n=>n.roles.includes(req.body));
    //   navSideBarItemArr.forEach(i=> i.url=(i.url=="/home" ||i.url.startsWith('processtracking') ? i.url: i.url.replace("/","/"+req.body+"-")));
    //   return of(new HttpResponse({ status: 200, body: {results:navSideBarItemArr}}));
    // }

    // creating interceptor for automatically appending the token on all outgoing API requests
    const idToken = localStorage.getItem("access");
    if (idToken) {
      const cloned = req.clone({
          headers: req.headers.set("Authorization",
              "Bearer " + idToken)
      });
      return next.handle(cloned);
    }
      else {
        return next.handle(req);
    }

  }
}
