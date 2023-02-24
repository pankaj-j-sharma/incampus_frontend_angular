import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/services/rest-api/rest-api.service';
import { TeacherData,TeacherDetailsData } from 'src/app/interfaces/teacher-data';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  processing=false;
  teacherDataList : TeacherData[];

  teacherData:TeacherDetailsData = {
    id:-1,
    added_by:-1,
    address:"",
    email:"",
    first_name:"",
    gender:"",
    incampus_type:"teacher",
    last_name:"",
    password:"",
    phone_no:"",
    username:""
  }

  selectedTeacher:number=-1;

  totalRecords:any;
  page:Number=1;
  teacherForm:FormGroup;

  constructor( private restAPIService : RestApiService, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
    this.loadAllTeachers();
  }

  createForm(){
    this.teacherForm = new FormGroup({
      username: new FormControl(this.teacherData.username,[Validators.required]),
      first_name: new FormControl(this.teacherData.first_name,[Validators.required]),
      last_name: new FormControl(this.teacherData.last_name,[Validators.required]),
      email: new FormControl(this.teacherData.email,[Validators.required]),
      incampus_type: new FormControl(this.teacherData.incampus_type,[Validators.required]),
      address: new FormControl(this.teacherData.address,[Validators.required]),
      gender: new FormControl(this.teacherData.gender,[Validators.required]),
      phone_no: new FormControl(this.teacherData.phone_no,[Validators.required]),
      password: new FormControl(this.teacherData.password,[Validators.required]),
   });
  }

  patchForm(){
    this.teacherForm.patchValue({
      username:this.teacherData.username,
      first_name:this.teacherData.first_name,
      last_name:this.teacherData.last_name,
      email:this.teacherData.email,
      incampus_type:this.teacherData.incampus_type,
      address:this.teacherData.address,
      gender:this.teacherData.gender,
      phone_no:this.teacherData.phone_no,
      password:this.teacherData.password,
    })
  }

  selectTeacher(id:number){
    this.selectedTeacher=id;
    this.processing=true;
    this.restAPIService.getTeacherbyId(id).subscribe(
    
    {
      next: (resp) => {
        console.log("loadteacher resp",id,resp);
        if(resp){
          this.teacherData = resp;
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
    
    if (!(this.teacherData)){
      this.initTeacherData();
    }
    // update form to be ready for edit 
    this.patchForm();
  }

  initTeacherData(){
    this.teacherData = {
      id:-1,
      added_by:-1,
      address:"",
      email:"",
      first_name:"",
      gender:"",
      incampus_type:"teacher",
      last_name:"",
      password:"",
      phone_no:"",
      username:""
    }
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

  addTeacher(teacher:any){
    console.log("teacher component data recieved ",teacher);
    this.processing=true;
    this.restAPIService.addNewTeacher(teacher).subscribe(
    
    {
      next: (resp) => {
        console.log("addGrade resp",resp);
        if(resp){
          this.teacherForm.reset();
          this.loadAllTeachers();
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

  updateTeacher(grade:any){
    this.processing=true;
    this.restAPIService.updateTeacher(this.selectedTeacher,grade).subscribe(
    
    {
      next: (resp) => {
        console.log("updateGrade resp",resp);
        if(resp){
          this.teacherForm.reset();
          this.loadAllTeachers();
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
