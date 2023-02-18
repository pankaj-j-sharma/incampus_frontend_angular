import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AttendanceData } from 'src/app/interfaces/attendance-data';
import { GradeData } from 'src/app/interfaces/grade-data';
import { RestApiService } from 'src/services/rest-api/rest-api.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  processing=false;
  attendanceDataList : AttendanceData[];
  allGradesDataList:GradeData[]=[];
  allMonthDataList:any[]=[];
  allYearDataList:any[]=[];

  selectedYear:any = ""
  selectedMonth:any=""
  selectedGrade:any = ""

  totalRecords:any;
  page:Number=1

  constructor( private restAPIService : RestApiService, private router: Router) { }

  ngOnInit(): void {
    this.loadAllDdnforAttendance();    
  }

  loadAllAttendance(year:any,month:any,grade:any){
    this.processing=true;
    let queryparams=`year=${year}&month=${month}&grade=${grade}`;
    this.restAPIService.getAllAttendance(queryparams).subscribe(
    
    {
      next: (resp) => {
        console.log("loadAllAttendance resp",resp);
        if(resp && resp.data){
          let results = resp.data;
          this.attendanceDataList = results;
          this.totalRecords = this.attendanceDataList.length;
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

  loadAllDdnforAttendance(){
    this.processing=true;
    this.restAPIService.getAllDdnForAttendance().subscribe(
    
    {
      next: (resp) => {
        console.log("loadAllDdnforAttendance resp",resp);
        if(resp){
          this.allGradesDataList = resp.grade_list;
          this.allYearDataList = resp.year_list;
          this.allMonthDataList = resp.month_list;
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

  onSelection(event,element){
    let val = event.target.value;
    if(element == "year"){
      this.selectedYear = val 
    }else if (element == "month"){
      this.selectedMonth = val
    }else if (element == "grade") {
      this.selectedGrade = val
    }
    this.loadAllAttendance(this.selectedYear,this.selectedMonth,this.selectedGrade);
  }
  
  nextPage(page:number){
    console.log("page",page);
  }

}
