import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubjectRouteData , SubjectRouteInfoData} from 'src/app/interfaces/subject-route-data';
import { RestApiService } from 'src/services/rest-api/rest-api.service';

@Component({
  selector: 'app-subject-route',
  templateUrl: './subject-route.component.html',
  styleUrls: ['./subject-route.component.css']
})
export class SubjectRouteComponent implements OnInit {

  processing=false;
  subjectRouteDataList : SubjectRouteData[];

  subjectRouteInfoData:SubjectRouteInfoData = {
    id:-1,
    created:"",
    grade_name:"",
    subject_fee:"",
    subject_name:"",
    teacher_name:"",
    grade:"-1",
    subject:"-1",
    teacher:"-1"
  }

  selectedSubjectRoute:number=-1;

  totalRecords:any;
  page:Number=1;
  subjectRouteForm:FormGroup;

  constructor( private restAPIService : RestApiService, private router: Router , public fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    this.loadAllSubjectRoutes();
  }

  createForm(){
    this.subjectRouteForm = this.fb.group({
      subject: this.fb.control(this.subjectRouteInfoData.subject,[Validators.required]),
      grade: this.fb.control(this.subjectRouteInfoData.grade,[Validators.required]),
      teacher: this.fb.control(this.subjectRouteInfoData.teacher,[Validators.required]),
      subject_fee: this.fb.control(this.subjectRouteInfoData.subject_fee,[Validators.required]),
   });
  }

  patchForm(){
    this.subjectRouteForm.patchValue({
      subject: this.subjectRouteInfoData.subject,
      grade: this.subjectRouteInfoData.grade,
      teacher: this.subjectRouteInfoData.teacher,
      subject_fee: this.subjectRouteInfoData.subject_fee,
    })
  }

  selectSubjectRoute(id:number){
    // default value so no need to find the teacher with id -1
    if(id==-1){
      this.processing=false;
      return
    }
    this.selectedSubjectRoute=id;
    this.processing=true;
    this.restAPIService.getSubjectRoutebyId(id).subscribe(
    
    {
      next: (resp) => {
        console.log("loadteacher resp",id,resp);
        if(resp){
          this.subjectRouteInfoData = resp;
        }
        if (!(this.subjectRouteInfoData)){
          this.initSubjectRouteData();
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

  initSubjectRouteData(){
    this.subjectRouteInfoData = {
      id:-1,
      created:"",
      grade_name:"",
      subject_fee:"",
      subject_name:"",
      teacher_name:"",
      grade:"",
      subject:"",
      teacher:""
    }
  }  


  loadAllSubjectRoutes(){
    this.processing=true;
    this.restAPIService.getAllSubjectRoutes().subscribe(
    
    {
      next: (resp) => {
        console.log("loadAllSubjectRoutes resp",resp);
        if(resp){
          this.subjectRouteDataList = resp;
          this.totalRecords = this.subjectRouteDataList.length;
          this.selectSubjectRoute(this.selectedSubjectRoute);
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

  addSubjectRoute(subjectroute:any){
    console.log("subject route component data recieved ",subjectroute);
    this.processing=true;
    this.restAPIService.addNewSubjectRoute(subjectroute).subscribe(
    
    {
      next: (resp) => {
        console.log("addSubjectRoute resp",resp);
        if(resp){
          this.subjectRouteForm.reset();
          this.loadAllSubjectRoutes();
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

  updateSubjectRoute(subjectroute:any){
    this.processing=true;
    this.restAPIService.updateSubjectRoute(this.selectedSubjectRoute,subjectroute).subscribe(
    
    {
      next: (resp) => {
        console.log("updateSubjectRoute resp",resp);
        if(resp){
          this.subjectRouteForm.reset();
          this.loadAllSubjectRoutes();
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
