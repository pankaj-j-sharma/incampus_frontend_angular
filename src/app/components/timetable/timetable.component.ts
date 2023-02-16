import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GradeData } from 'src/app/interfaces/grade-data';
import { TimeTableData } from 'src/app/interfaces/timetable-data';
import { RestApiService } from 'src/services/rest-api/rest-api.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {

  processing=false;
  selectedGrade:GradeData={
    id:-1,
    name:"Select Grade",
    admission_fee:"",
    created:"",
    hall_charges:"",
    student_count:""
  };
 
  allGradesDataList:GradeData[]=[];
  gradeTimetableDataList:TimeTableData[]=[];

  schedule_days=[
    "Monday","Tuesday","Wednesday","Thursday","Friday"
  ];
  all_schedule_times = [];

  constructor(private restAPIService : RestApiService, private router: Router) { }

  ngOnInit(): void {
    this.loadAllGradesforDdn();
  }

  initGradeDdn(){
    this.selectedGrade={
      id:-1,
      name:"Select Grade",
      admission_fee:"",
      created:"",
      hall_charges:"",
      student_count:""
    };  
  }

  loadAllGradesforDdn(){
    this.processing=true;
    this.restAPIService.getAllGradesDdn().subscribe(
    
    {
      next: (resp) => {
        console.log("loadAllGradesforDdn resp",resp);
        if(resp){
          this.allGradesDataList = resp;
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

  loadGradeTimetable(gradeid:number){
    this.processing=true;
    let queryparams = `grade_id=${gradeid}`;
    this.restAPIService.getGradeTimetable(queryparams).subscribe(    
    {
      next: (resp) => {
        console.log("loadGradeTimetable resp",resp);
        if(resp){
          this.gradeTimetableDataList = resp;
          this.__formatTimetableDataList(this.gradeTimetableDataList);
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

  __formatTimetableDataList(timetabledata:TimeTableData[]){
      timetabledata.forEach(t=>{
        if(!(this.all_schedule_times.find(a=>a.start_time == t.start_time))){
          this.all_schedule_times.push({
            "start_time":t.start_time,
            "end_time":t.end_time
          });  
        }
      })
  }

  getScheduleTimeTable(start_time:any){
    let outData=[];
    this.gradeTimetableDataList.filter(g=>g.start_time==start_time);
    this.schedule_days.forEach(day=>{
      outData.push(this.gradeTimetableDataList.filter(g=>g.start_time==start_time && g.schedule_day==day ))
    })
    return outData.flat(1);
  }

  onGradeSelection(event:any){    
    let selectedGrade = this.allGradesDataList.find(g => g.id == event.target.value);
    if (selectedGrade!=undefined){
      this.selectedGrade = selectedGrade;
      this.loadGradeTimetable(this.selectedGrade.id);
    }else{
      this.initGradeDdn();
    }
    console.log("selected grade",event.target.value, this.selectedGrade.id);
  }

}
