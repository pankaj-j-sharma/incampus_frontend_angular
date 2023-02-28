import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GradeData } from 'src/app/interfaces/grade-data';
import { TimeTableData, TimeTableInfoData } from 'src/app/interfaces/timetable-data';
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

  gradeTimetableInfoData:TimeTableInfoData = {
    id:-1,
    grade:-1,
    subject:-1,
    teacher:-1,
    classroom:-1,
    schedule_day:"-1",
    start_time : "-1",
    end_time:"-1",
    created:"",
    classroom_name:"",
    subject_name:"",
    teacher_name:""
  }

  selectedSubjectRoute:number=-1;

  totalRecords:any;
  page:Number=1;
  timetableForm:FormGroup;


  constructor(private restAPIService : RestApiService, private router: Router, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    this.loadAllGradesforDdn();
  }

  createForm(){
    this.timetableForm = this.fb.group({
      schedule_day: this.fb.control(this.gradeTimetableInfoData.schedule_day,[Validators.required]),
      start_time: this.fb.control(this.gradeTimetableInfoData.start_time,[Validators.required]),
      end_time: this.fb.control(this.gradeTimetableInfoData.end_time,[Validators.required]),
      classroom: this.fb.control(this.gradeTimetableInfoData.classroom,[Validators.required]),
      subject: this.fb.control(this.gradeTimetableInfoData.subject,[Validators.required]),
      grade: this.fb.control(this.gradeTimetableInfoData.grade,[Validators.required]),
      teacher: this.fb.control(this.gradeTimetableInfoData.teacher,[Validators.required]),
   });
  }

  patchForm(){
    this.timetableForm.patchValue({
      schedule_day: this.gradeTimetableInfoData.schedule_day,
      start_time: this.gradeTimetableInfoData.start_time,
      end_time: this.gradeTimetableInfoData.end_time,
      classroom: this.gradeTimetableInfoData.classroom,
      subject: this.gradeTimetableInfoData.subject,
      grade: this.gradeTimetableInfoData.grade,
      teacher: this.gradeTimetableInfoData.teacher,
    })
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
          this.gradeTimetableInfoData.grade = gradeid;
          this.patchForm();    
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

  addDailyTimetable(timetable:any){
    console.log("timetable component data recieved ",timetable);
    this.processing=true;
    this.restAPIService.addNewTimetable(timetable).subscribe(
    
    {
      next: (resp) => {
        console.log("addDailyTimetable resp",resp);
        if(resp){
          this.loadGradeTimetable(this.selectedGrade.id);
          this.timetableForm.reset();
        }
        else{
          this.processing=false;
        }
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
