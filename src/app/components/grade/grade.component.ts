import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/services/rest-api/rest-api.service';
import { GradeData } from 'src/app/interfaces/grade-data';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit {

  processing=false;
  gradeDataList : GradeData[];

  gradeData:GradeData = {
    id:-1,
    created:"",
    admission_fee:"",
    hall_charges:"",
    name:"",
    student_count:""
  }

  selectedGrade:number=-1;

  totalRecords:any;
  page:Number=1;
  gradeForm:FormGroup;

  constructor( private restAPIService : RestApiService, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
    this.loadAllGrades();
  }

  createForm(){
    this.gradeForm = new FormGroup({
      name: new FormControl(this.gradeData.name,[Validators.required]),
      admission_fee: new FormControl(this.gradeData.admission_fee,[Validators.required]),
      hall_charges: new FormControl(this.gradeData.hall_charges,[Validators.required]),
   });
  }

  patchForm(){
    this.gradeForm.patchValue({
      name:this.gradeData.name,
      admission_fee:this.gradeData.admission_fee,
      hall_charges:this.gradeData.hall_charges,
    })
  }

  selectGrade(id:number){
    this.selectedGrade=id;
    this.gradeData = this.gradeDataList.find(f=> f.id == this.selectedGrade);
    if (!(this.gradeData)){
      this.initGradeData();
    }
    // update form to be ready for edit 
    this.patchForm();
  }

  initGradeData(){
    this.gradeData = {
      id:-1,
      created:"",
      admission_fee:"",
      hall_charges:"",
      name:"",
      student_count:""
    }
  }  

  loadAllGrades(){
    this.processing=true;
    this.restAPIService.getAllGrades().subscribe(
    
    {
      next: (resp) => {
        console.log("loadAllGrades resp",resp);
        if(resp){
          this.gradeDataList = resp;
          this.totalRecords = this.gradeDataList.length;
          this.selectGrade(this.selectedGrade);
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

  addGrade(grade:any){
    console.log("grade component data recieved ",grade);
    this.processing=true;
    this.restAPIService.addNewGrade(grade).subscribe(
    
    {
      next: (resp) => {
        console.log("addGrade resp",resp);
        if(resp){
          this.gradeForm.reset();
          this.loadAllGrades();
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

  updateGrade(grade:any){
    this.processing=true;
    this.restAPIService.updateGrade(this.selectedGrade,grade).subscribe(
    
    {
      next: (resp) => {
        console.log("updateGrade resp",resp);
        if(resp){
          this.gradeForm.reset();
          this.loadAllGrades();
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
