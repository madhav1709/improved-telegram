import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private url = 'https://chatapi.edwisor.com';
  //private authToken = 'YWRkYWMwM2ZiOWQ5MTg1N2YzMDNkZDZjYzgyOGU1YjliZTg1MTkzMDMwZWUyOWMxZWVlZjI0NmFkMGFlMmFmZWM2ZGU4OWQxZWUyNTc2YWU3YjNlMjMyMDZjYzljOTkxYjI1YzQwZWI0NGNmMTFlM2E5YTY1YzU5YWMxZjU3MGIxMA==';
  constructor(public http:HttpClient) { }

  public getUserInfoFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("userInfo"));
  }

  public setUserInfoInLocalStorage = (data) =>{
    localStorage.setItem('userInfo',JSON.stringify(data));
  }

  public signupFunction(data): Observable<any> {
    const params = new HttpParams()
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('mobileNumber', data.mobileNumber)
      .set('email', data.email)
      .set('password', data.password)
      .set('apiKey', data.apiKey);

      return this.http.post(`${this.url}/api/v1/users/signup`,params);
  
  
    }
    public signinFunction(data): Observable<any> {
      const params = new HttpParams()
        .set('email', data.email)
        .set('password', data.password);
        return this.http.post(`${this.url}/api/v1/users/login`,params);
      
      }  


}
