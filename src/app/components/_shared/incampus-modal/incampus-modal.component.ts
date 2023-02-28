import { Component, Input,Output, OnInit, SimpleChanges, TemplateRef, ViewChild, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GradeData } from 'src/app/interfaces/grade-data';
import { TeacherData } from 'src/app/interfaces/teacher-data';
import { SubjectData } from 'src/app/interfaces/subject-data';

import { RestApiService } from 'src/services/rest-api/rest-api.service';
import { ClassroomData } from 'src/app/interfaces/classroom-data';


@Component({
  selector: 'app-incampus-modal',
  templateUrl: './incampus-modal.component.html',
  styleUrls: ['./incampus-modal.component.css']
})
export class IncampusModalComponent implements OnInit {

	closeResult: string;
  display = "none";
  allGradesDataList:GradeData[]=[];
  allSubjectsDataList:SubjectData[]=[];
  allTeachersDataList:TeacherData[]=[];
  allClassroomsDataList:ClassroomData[]=[];
  allscheduleDaysList=[
    "Monday","Tuesday","Wednesday","Thursday","Friday"
  ];  
  scheduleTimeDataList:any[]=[];

  @Input() modalId :string=""; 
  @Input('formGroup') modalForm :any; 
  @Output() onFormSubmit = new EventEmitter<any>();
  arrOfRows:number[]=[];
  numberOfCols:number=9;

  @ViewChild('longContent', { read: TemplateRef ,static: false}) private longContent:TemplateRef<any>;


	constructor(private modalService: NgbModal, private restAPIService : RestApiService, private router: Router) {}

  ngOnChanges(changes: SimpleChanges) {   
    for (let propName in changes) {
       // when your @Input value is changed  
       if(propName === "formGroup"){
           console.log(this.modalForm);
       }
    }
 }

 submitModalForm(){
  console.log("submitModalForm",this.modalForm.value);
  this.onFormSubmit.emit(this.modalForm.value);
 }

  launchModal(){
    this.openScrollableContent(this.longContent);
    console.log("modalId passed",this.modalId,this.modalForm);
  }

	openScrollableContent(longContent) {
		this.modalService.open(longContent, { scrollable: true} ).result.then((result)=> {
      this.closeResult = `Closed with ${result}`;
    },(reason)=> {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log("this.closeResult",this.closeResult);
    });
	}

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  loadAllGradesforDdn(){
    this.restAPIService.getAllGradesDdn().subscribe(
    
    {
      next: (resp) => {
        console.log("loadAllGradesforDdn resp",resp);
        if(resp){
          this.allGradesDataList = resp;
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

  loadAllSubjectsforDdn(){
    this.restAPIService.getAllSubjectsDdn().subscribe(
    
    {
      next: (resp) => {
        console.log("loadAllSubjectsforDdn resp",resp);
        if(resp){
          this.allSubjectsDataList = resp;
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


  loadAllScheduleTimesforDdn(){
    this.restAPIService.getAllScheduleTimesDdn().subscribe(
    
    {
      next: (resp) => {
        console.log("loadAllScheduleTimesforDdn resp",resp);
        if(resp){
          this.scheduleTimeDataList = resp;
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


  loadAllClassroomsforDdn(){
    this.restAPIService.getAllClassroomsDdn().subscribe(
    
    {
      next: (resp) => {
        console.log("loadAllClassroomsforDdn resp",resp);
        if(resp){
          this.allClassroomsDataList = resp;
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

  loadAllTeachersforDdn(){
    this.restAPIService.getAllTeachersDdn().subscribe(
    
    {
      next: (resp) => {
        console.log("loadAllTeachersforDdn resp",resp);
        if(resp){
          this.allTeachersDataList = resp;
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
  // openModal() {
  //   this.display = "block";
  // }
  // onCloseHandled() {
  //   this.display = "none";
  // }  

  ngOnInit(): void {
    // this.openScrollableContent(this.longContent);
    console.log("modal id",this.modalId);
    this.loadAllGradesforDdn();
    this.loadAllSubjectsforDdn();
    this.loadAllTeachersforDdn();
    this.loadAllClassroomsforDdn();
    this.loadAllScheduleTimesforDdn();
  }

  onSelectionChanged(name:string,e: any) {
    this.modalForm.get(name).setValue(e.target.value, {
        onlySelf: true,
      });
  }

}
