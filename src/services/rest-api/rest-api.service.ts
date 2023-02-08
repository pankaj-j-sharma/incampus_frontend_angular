import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  /* take the hostname dynamically from the window object*/
  private BASE_URL = window.location.hostname=="localhost" ? "http://127.0.0.1:8000/" : "http://"+window.location.hostname+"/";
  private userLoginUrl = this.BASE_URL+"login";
  private getallstudentsUrl = this.BASE_URL+"students";
  private updateStudentInfoUrl = this.BASE_URL+"studentinfo";
  private loadDashboardDataUrl = this.BASE_URL+"dashboard/loaddata";

  httpOptions = {
    headers: new HttpHeaders({
      //'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',      
  })
  };

  constructor(private http: HttpClient) { }

  hasLoginToken():Boolean{
    return localStorage.getItem('token') ? true : false;
  }

  saveLoginToken(data:any[]){
    localStorage.clear();
    for(let i in data){
      localStorage.setItem(i ,data[i] );
    }
  }

  getAllStudents(){
    return this.http.get<any>(this.getallstudentsUrl , this.httpOptions);        
  }

  getDashboardData(){
    return this.http.get<any>(this.loadDashboardDataUrl );        
  } 

  updateStudentInfo(postData:any){
    return this.http.post<any>(this.updateStudentInfoUrl,postData , this.httpOptions);        
  }

}
