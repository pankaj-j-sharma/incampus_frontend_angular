import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  /* take the hostname dynamically from the window object*/
  private BASE_URL = window.location.hostname=="localhost" ? "http://localhost:8080/" : "http://"+window.location.hostname+"/";
  private userLoginUrl = this.BASE_URL+"api/token/";
  private loadUserProfileDataUrl = this.BASE_URL+"userprofile/profiledetails";
  private loadAllClassroomsDataUrl = this.BASE_URL+"grade/classroomlist";
  private addNewClassroomDataUrl = this.BASE_URL+"grade/create_classroom";
  private updateClassroomDataUrl = this.BASE_URL+"grade/classroom?id=";
  private loadAllClassroomsDdnDataUrl = this.BASE_URL+"grade/classroomlistddn";
  private loadAllGradesDataUrl = this.BASE_URL+"grade/gradelist";
  private addNewGradeDataUrl = this.BASE_URL+"grade/create_grade";
  private updateGradeDataUrl = this.BASE_URL+"grade/gradeinfo?id=";
  private loadAllGradesDdnDataUrl = this.BASE_URL+"grade/gradelistddn";
  private loadGradeTimetableDataUrl = this.BASE_URL+"grade/dailyschedulelist";
  private addNewTimetableDataUrl = this.BASE_URL+"grade/create_dailyschedule";
  private loadAllSubjectsDataUrl = this.BASE_URL+"grade/subjectlist";
  private addNewSubjectDataUrl = this.BASE_URL+"grade/create_subject";
  private updateSubjectDataUrl = this.BASE_URL+"grade/subjectinfo?id=";
  private loadAllSubjectsDdnDataUrl = this.BASE_URL+"grade/subjectlistddn";
  private loadAllTeachersDataUrl = this.BASE_URL+"teacher/teacherlist";
  private loadTeacherbyIdDataUrl = this.BASE_URL+"teacher/teacher?id=";
  private addNewTeacherDataUrl = this.BASE_URL+"teacher/create_teacher";
  private updateTeacherDataUrl = this.BASE_URL+"teacher/teacher?id=";
  private loadAllTeachersDdnDataUrl = this.BASE_URL+"teacher/teacherlistddn";
  private loadAllSubjectRoutesDataUrl = this.BASE_URL+"grade/subjectroutinglist";
  private addNewSubjectRouteDataUrl = this.BASE_URL+"grade/create_subjectrouting";
  private updateSubjectRouteDataUrl = this.BASE_URL+"grade/subjectroutinginfo?id=";
  private loadSubjectRoutebyIdDataUrl = this.BASE_URL+"grade/subjectroutinginfo?id=";
  private loadAllStudentsDataUrl = this.BASE_URL+"student/studentlist";
  private loadStudentbyIdDataUrl = this.BASE_URL+"student/student?id=";
  private addNewStudentDataUrl = this.BASE_URL+"student/create_student";
  private updateStudentDataUrl = this.BASE_URL+"teacher/teacher?id=";
  private loadAllPaymentsDataUrl = this.BASE_URL+"payment/payment_list";
  private loadStudentsPaymentsDataUrl = this.BASE_URL+"student/student_payment_list";
  private loadAttendanceDataUrl = this.BASE_URL+"attendance/attendancelist";
  private loadAllDdnForAttendanceDataUrl = this.BASE_URL+"attendance/attendanceddnlist";
  private loadAllExamsDataUrl = this.BASE_URL+"grade/examlist";
  private loadExamSchedulesDataUrl = this.BASE_URL+"grade/examschedulelist";
  private loadMyFriendsDataUrl = this.BASE_URL+"friends/friend_list";
  private loadDashboardDataUrl = this.BASE_URL+"dashboard/loaddata";
  private loadAllScheduleTimesDataUrl = this.BASE_URL+"grade/startendtimeddn";

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

  getAllClassroomsDdn(){
    return this.http.get<any>(this.loadAllClassroomsDdnDataUrl );        
  }

  addNewClassroom(postData:any){
    return this.http.post<any>(this.addNewClassroomDataUrl,postData );        
  }

  updateClassroom(id:number,putData:any){
    return this.http.put<any>(this.updateClassroomDataUrl+id.toString(),putData );        
  }

  getAllGrades(){
    return this.http.get<any>(this.loadAllGradesDataUrl );        
  } 

  addNewGrade(postData:any){
    return this.http.post<any>(this.addNewGradeDataUrl,postData );        
  }

  updateGrade(id:number,putData:any){
    return this.http.put<any>(this.updateGradeDataUrl+id.toString(),putData );        
  }

  getAllGradesDdn(){
    return this.http.get<any>(this.loadAllGradesDdnDataUrl );        
  }

  getGradeTimetable(queryparams:string){
    return this.http.get<any>(this.loadGradeTimetableDataUrl+"?"+queryparams );        
  }

  addNewTimetable(postData:any){
    return this.http.post<any>(this.addNewTimetableDataUrl,postData );        
  }

  getAllSubjects(){
    return this.http.get<any>(this.loadAllSubjectsDataUrl );        
  } 

  getAllSubjectsDdn(){
    return this.http.get<any>(this.loadAllSubjectsDdnDataUrl );        
  }

  addNewSubject(postData:any){
    return this.http.post<any>(this.addNewSubjectDataUrl,postData );        
  }

  updateSubject(id:number,putData:any){
    return this.http.put<any>(this.updateSubjectDataUrl+id.toString(),putData );        
  }

  getAllTeachers(){
    return this.http.get<any>(this.loadAllTeachersDataUrl );        
  } 

  getAllTeachersDdn(){
    return this.http.get<any>(this.loadAllTeachersDdnDataUrl );
  }

  getTeacherbyId(id:number){
    return this.http.get<any>(this.loadTeacherbyIdDataUrl+id.toString() );  
  }

  addNewTeacher(postData:any){
    return this.http.post<any>(this.addNewTeacherDataUrl,postData );        
  } 

  updateTeacher(id:number,putData:any){
    return this.http.put<any>(this.updateTeacherDataUrl+id.toString(),putData );        
  }

  getAllSubjectRoutes(){
    return this.http.get<any>(this.loadAllSubjectRoutesDataUrl );        
  } 

  addNewSubjectRoute(postData:any){
    return this.http.post<any>(this.addNewSubjectRouteDataUrl,postData );        
  }

  updateSubjectRoute(id:number,putData:any){
    return this.http.put<any>(this.updateSubjectRouteDataUrl+id.toString(),putData );        
  }

  getSubjectRoutebyId(id:number){
    return this.http.get<any>(this.loadSubjectRoutebyIdDataUrl+id.toString() );  
  }

  getAllStudents(){
    return this.http.get<any>(this.loadAllStudentsDataUrl );        
  } 

  getStudentbyId(id:number){
    return this.http.get<any>(this.loadStudentbyIdDataUrl+id.toString() );  
  }

  addNewStudent(postData:any){
    return this.http.post<any>(this.addNewStudentDataUrl,postData );        
  } 

  updateStudent(id:number,putData:any){
    return this.http.put<any>(this.updateStudentDataUrl+id.toString(),putData );        
  }

  getStudentsPayments(){
    return this.http.get<any>(this.loadStudentsPaymentsDataUrl );        
  } 
  
  getAllPayments(){
    return this.http.get<any>(this.loadAllPaymentsDataUrl );        
  } 

  getAllAttendance(queryparams:string){
    return this.http.get<any>(this.loadAttendanceDataUrl+"?"+queryparams );
  } 

  getAllDdnForAttendance(){
    return this.http.get<any>(this.loadAllDdnForAttendanceDataUrl);
  }

  getAllExams(){
    return this.http.get<any>(this.loadAllExamsDataUrl);
  }

  getExamSchedules(queryparams:string){
    return this.http.get<any>(this.loadExamSchedulesDataUrl+"?"+queryparams );
  } 

  getMyFriends(){
    return this.http.get<any>(this.loadMyFriendsDataUrl);
  }

  updateUserProfile(postData:any){
    return this.http.put<any>(this.loadUserProfileDataUrl, postData, this.httpOptions );
  } 

  getAllScheduleTimesDdn(){
    return this.http.get<any>(this.loadAllScheduleTimesDataUrl);
  }

  // getAllStudents(){
  //   return this.http.get<any>(this.getallstudentsUrl , this.httpOptions);        
  // }

  // updateStudentInfo(postData:any){
  //   return this.http.post<any>(this.updateStudentInfoUrl,postData , this.httpOptions);        
  // }

}
