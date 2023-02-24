import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/services/rest-api/rest-api.service';
import { ClassroomData } from 'src/app/interfaces/classroom-data';
import { IncampusModalComponent } from '../_shared/incampus-modal/incampus-modal.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit {

  processing=false;
  classroomDataList : ClassroomData[];
  classroomData:ClassroomData = {
    id:-1,
    created:"",
    location:"",
    name:"",
    status:"",
    student_count:""
  }

  selectedClassroom:number=-1;

  totalRecords:any;
  page:Number=1;
  classroomForm:FormGroup;

  constructor( private restAPIService : RestApiService, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
    this.loadAllClassrooms();
  }

  createForm(){
    this.classroomForm = new FormGroup({
      name: new FormControl(this.classroomData.name,[Validators.required]),
      location: new FormControl(this.classroomData.location,[Validators.required]),
      student_count: new FormControl(this.classroomData.student_count,[Validators.required]),
      status: new FormControl(this.classroomData.status),
   });
  }

  patchForm(){
    this.classroomForm.patchValue({
      name:this.classroomData.name,
      location:this.classroomData.location,
      student_count:this.classroomData.student_count,
      status:this.classroomData.status
    })
  }

  selectClassroom(id:number){
    this.selectedClassroom=id;
    this.classroomData = this.classroomDataList.find(f=> f.id == this.selectedClassroom);
    if (!(this.classroomData)){
      this.initClassroomData();
    }
    // update form to be ready for edit 
    this.patchForm();
  }

  initClassroomData(){
    this.classroomData = {
      id:-1,
      created:"",
      location:"",
      name:"",
      status:"",
      student_count:""
    }
  }

  loadAllClassrooms(){
    this.processing=true;
    this.restAPIService.getAllClassrooms().subscribe(
    
    {
      next: (resp) => {
        console.log("loadAllClassrooms resp",resp);
        if(resp){
          this.classroomDataList = resp;
          this.totalRecords = this.classroomDataList.length;
          this.selectClassroom(this.selectedClassroom);
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

  addClassroom(classroom:any){
    console.log("classroom component data recieved ",classroom);
    this.processing=true;
    this.restAPIService.addNewClassroom(classroom).subscribe(
    
    {
      next: (resp) => {
        console.log("addClassroom resp",resp);
        if(resp){
          this.classroomForm.reset();
          this.loadAllClassrooms();
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

  updateClassroom(classroom:any){
    this.processing=true;
    this.restAPIService.updateClassroom(this.selectedClassroom,classroom).subscribe(
    
    {
      next: (resp) => {
        console.log("updateClassroom resp",resp);
        if(resp){
          this.classroomForm.reset();
          this.loadAllClassrooms();
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
