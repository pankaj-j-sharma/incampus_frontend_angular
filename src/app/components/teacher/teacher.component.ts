import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/services/rest-api/rest-api.service';
import { TeacherData } from 'src/app/interfaces/teacher-data';


@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  processing=false;
  teacherDataList : TeacherData[];

  totalRecords:any;
  page:Number=1

  constructor( private restAPIService : RestApiService, private router: Router) { }

  ngOnInit(): void {
    this.loadAllTeachers();
  }

  loadAllTeachers(){
    this.processing=true;
    this.restAPIService.getAllTeachers().subscribe(
    
    {
      next: (resp) => {
        console.log("loadAllTeachers resp",resp);
        if(resp){
          this.teacherDataList = resp;
          this.totalRecords = this.teacherDataList.length;
        }
        this.processing=false;
      },
      error: (err) => {
        console.error("err status",err.status);
        if(err.status==401){
          this.router.navigate(['/login']);
        }
      },
      complete: () => console.info('complete') 
    }    

  );

  }  

  nextPage(page:number){
    console.log("page",page);
  }


}
