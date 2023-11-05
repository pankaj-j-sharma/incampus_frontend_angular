import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentData, StudentDetailsData } from 'src/app/interfaces/student-data';
import { RestApiService } from 'src/services/rest-api/rest-api.service';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {


  processing=false;
  studentDataList : StudentData[];

  studentData:StudentDetailsData = {
    id:-1,
    added_by:-1,
    address:"",
    email:"",
    first_name:"",
    gender:"",
    incampus_type:"student",
    last_name:"",
    password:"12345",
    phone_no:"",
    username:""
  }

  selectedStudent:number=-1;

  totalRecords:any;
  page:Number=1;
  studentForm:FormGroup;

  constructor( private restAPIService : RestApiService, private router: Router, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    this.loadAllStudents();
  }

  createForm(){
    this.studentForm = this.fb.group({
      username: this.fb.control(this.studentData.username,[Validators.required]),
      first_name: this.fb.control(this.studentData.first_name,[Validators.required]),
      last_name: this.fb.control(this.studentData.last_name,[Validators.required]),
      email: this.fb.control(this.studentData.email,[Validators.required]),
      incampus_type: this.fb.control(this.studentData.incampus_type,[Validators.required]),
      address: this.fb.control(this.studentData.address,[Validators.required]),
      gender: this.fb.control(this.studentData.gender,[Validators.required]),
      phone_no: this.fb.control(this.studentData.phone_no,[Validators.required]),
   });
  }

  patchForm(){
    this.studentForm.patchValue({
      username:this.studentData.username,
      first_name:this.studentData.first_name,
      last_name:this.studentData.last_name,
      email:this.studentData.email,
      incampus_type:this.studentData.incampus_type,
      address:this.studentData.address,
      gender:this.studentData.gender,
      phone_no:this.studentData.phone_no,
    })
  }

  selectStudent(id:number){
    // default value so no need to find the teacher with id -1
    if(id==-1){
      this.processing=false;
      return
    }
    this.selectedStudent=id;
    this.processing=true;
    this.restAPIService.getStudentbyId(id).subscribe(
    
    {
      next: (resp) => {
        console.log("getStudentbyId resp",id,resp);
        if(resp){
          this.studentData = resp;
        }
        if (!(this.studentData)){
          this.initStudentData();
        }
        // update form to be ready for edit 
        this.patchForm();    
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

  initStudentData(){
    this.studentData = {
      id:-1,
      added_by:-1,
      address:"",
      email:"",
      first_name:"",
      gender:"",
      incampus_type:"student",
      last_name:"",
      password:"",
      phone_no:"",
      username:""
    }
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

  addStudent(student:any){
    console.log("student component data recieved ",student);
    this.processing=true;
    this.restAPIService.addNewStudent(student).subscribe(
    
    {
      next: (resp) => {
        console.log("addGrade resp",resp);
        if(resp){
          this.studentForm.reset();
          this.loadAllStudents();
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

  updateStudent(data: any){
    this.processing=true;
    this.restAPIService.updateStudent(this.selectedStudent,data).subscribe(
    
    {
      next: (resp) => {
        console.log("updateGrade resp",resp);
        if(resp){
          this.studentForm.reset();
          this.loadAllStudents();
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

  nextPage(page:number){
    console.log("page",page);
  }

}
