import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentData } from 'src/app/interfaces/student-data';
import { RestApiService } from 'src/services/rest-api/rest-api.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {


  processing=false;
  studentDataList : StudentData[];

  totalRecords:any;
  page:Number=1

  constructor( private restAPIService : RestApiService, private router: Router) { }

  ngOnInit(): void {
    this.loadAllStudents();
  }

  loadAllStudents(){
    this.processing=true;
    this.restAPIService.getAllStudents().subscribe(
    
    {
      next: (resp) => {
        console.log("loadAllStudents resp",resp);
        if(resp){
          this.studentDataList = resp;
          this.totalRecords = this.studentDataList.length;
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
