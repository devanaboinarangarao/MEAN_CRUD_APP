import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http'
import {environment} from '../environments/environment'
import { catchError } from 'rxjs/operators';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http : HttpClient) { }

  apiUrl : string = environment.apiUrl;

  

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': ''
    })
  };

  createAuthorizationHeader() {
    // console.log(localStorage.getItem("token"))
    let token = 'Bearer '+ localStorage.getItem("token");
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', token)
  }

  get(path : string) {
      this.createAuthorizationHeader();
      return this.http.get(this.apiUrl+path, this.httpOptions).pipe(catchError(this.handleError));
    } 
  post(path : string, data : any) {
    this.createAuthorizationHeader();
    return this.http.post(this.apiUrl+path, data, this.httpOptions).pipe(catchError(this.handleError))
  }
  put(path : string, data : any) {
    this.createAuthorizationHeader();
    return this.http.put(this.apiUrl+path, data, this.httpOptions).pipe(catchError(this.handleError))
  }
  delete(path : string) {
    this.createAuthorizationHeader();
    return this.http.delete(this.apiUrl+path,this.httpOptions).pipe(catchError(this.handleError))
  }
  postUser(path : string,data : any) {
    return this.http.post(this.apiUrl+path, data);
  }

  private handleError(error: HttpErrorResponse) {
    console.log('handle error by ',error);
    return Observable.throw(error.error || 'Server error')
  }
}
