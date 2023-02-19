import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExamData, ExamScheduleData } from 'src/app/interfaces/exam-data';
import { RestApiService } from 'src/services/rest-api/rest-api.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  processing=false;
  examSelected = -1;
  examDataList : ExamData[] = [];
  examScheduleDataList : ExamScheduleData[] = [];

  totalExamRecords:any;
  totalExamScheduleRecords:any;
  page:Number=1

  constructor(private restAPIService : RestApiService, private router: Router) { }

  ngOnInit(): void {
    this.loadAllExams();
  }

  loadAllExams(){
    this.processing=true;
    this.restAPIService.getAllExams().subscribe(
    
    {
      next: (resp) => {
        console.log("loadAllExams resp",resp);
        if(resp){
          this.examDataList = resp;
          this.totalExamRecords = this.examDataList.length;          
          // this.loadExamSchedules(this.examDataList[0].id); // for testing only
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

  loadExamSchedules(exam:any) {
    this.processing=true;
    let queryparams=`exam=${exam}`;
    this.restAPIService.getExamSchedules(queryparams).subscribe(
    
    {
      next: (resp) => {
        console.log("loadExamSchedules resp",resp);
        if(resp){
          this.examScheduleDataList = resp;
          this.totalExamScheduleRecords = this.examScheduleDataList.length;          
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

  selectExamRow(exam_id:number){
    this.examSelected = exam_id;
    this.loadExamSchedules(this.examSelected);
  }
}
