import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/services/rest-api/rest-api.service';
import { SubjectData } from 'src/app/interfaces/subject-data';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  processing=false;
  subjectDataList : SubjectData[];

  subjectData:SubjectData = {
    id:-1,
    name:"",
    created:"",
    grade_count:"",
    is_mapped:false,
    student_count:""
  }

  selectedSubject:number=-1;

  totalRecords:any;
  page:Number=1;
  subjectForm:FormGroup;


  constructor( private restAPIService : RestApiService, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
    this.loadAllSubjects();
  }

  createForm(){
    this.subjectForm = new FormGroup({
      name: new FormControl(this.subjectData.name,[Validators.required]),
   });
  }

  patchForm(){
    this.subjectForm.patchValue({
      name:this.subjectData.name
    })
  }

  selectSubject(id:number){
    this.selectedSubject=id;
    this.subjectData = this.subjectDataList.find(f=> f.id == this.selectedSubject);
    if (!(this.subjectData)){
      this.initSubjectData();
    }
    // update form to be ready for edit 
    this.patchForm();
  }

  initSubjectData(){
    this.subjectData = {
      id:-1,
      name:"",
      created:"",
      grade_count:"",
      is_mapped:false,
      student_count:""
    }
  }  

  loadAllSubjects(){
    this.processing=true;
    this.restAPIService.getAllSubjects().subscribe(
    
    {
      next: (resp) => {
        console.log("loadAllSubjects resp",resp);
        if(resp){
          this.subjectDataList = resp;
          this.totalRecords = this.subjectDataList.length;
          this.selectSubject(this.selectedSubject);
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

  addSubject(subject:any){
    console.log("subject component data recieved ",subject);
    this.processing=true;
    this.restAPIService.addNewSubject(subject).subscribe(
    
    {
      next: (resp) => {
        console.log("addGrade resp",resp);
        if(resp){
          this.subjectForm.reset();
          this.loadAllSubjects();
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

  updateSubject(grade:any){
    this.processing=true;
    this.restAPIService.updateSubject(this.selectedSubject,grade).subscribe(
    
    {
      next: (resp) => {
        console.log("updateSubject resp",resp);
        if(resp){
          this.subjectForm.reset();
          this.loadAllSubjects();
        }else{
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
