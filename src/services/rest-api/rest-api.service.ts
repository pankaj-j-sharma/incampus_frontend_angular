import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  /* take the hostname dynamically from the window object*/
  private BASE_URL = window.location.hostname=="localhost" ? "http://127.0.0.1:8000/" : "http://"+window.location.hostname+"/";
  private userLoginUrl = this.BASE_URL+"api/token/";
  private loadUserProfileDataUrl = this.BASE_URL+"userprofile/profiledetails";
  private loadAllClassroomsDataUrl = this.BASE_URL+"grade/classroomlist";
  private updateStudentInfoUrl = this.BASE_URL+"studentinfo";
  private loadDashboardDataUrl = this.BASE_URL+"dashboard/loaddata";

  httpOptions = {
    headers: new HttpHeaders({
      //'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',      
  })
  };

  constructor(private http: HttpClient) { }

  loginUser(postData:any){
    return this.http.post<any>(this.userLoginUrl,postData);        
  }

  hasLoginToken():Boolean{
    return localStorage.getItem('access') ? true : false;
  }

  saveLoginToken(data:any){
    localStorage.clear();
    for(let i in data){
      localStorage.setItem(i ,data[i] );
    }
  }

  clearLoginToken(){
    return new Observable(obs=> {
      obs.next(localStorage.clear());
    });
  }

  getDashboardData(){
    return this.http.get<any>(this.loadDashboardDataUrl, this.httpOptions );        
  } 

  getUserProfile(){
    return this.http.get<any>(this.loadUserProfileDataUrl );        
  } 

  getAllClassrooms(){
    return this.http.get<any>(this.loadAllClassroomsDataUrl );        
  } 

  updateUserProfile(postData:any){
    return this.http.put<any>(this.loadUserProfileDataUrl, postData, this.httpOptions );
  } 

  // getAllStudents(){
  //   return this.http.get<any>(this.getallstudentsUrl , this.httpOptions);        
  // }

  // updateStudentInfo(postData:any){
  //   return this.http.post<any>(this.updateStudentInfoUrl,postData , this.httpOptions);        
  // }

}
