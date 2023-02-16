import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/services/rest-api/rest-api.service';
import { SubjectData } from 'src/app/interfaces/subject-data';


@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  processing=false;
  subjectDataList : SubjectData[];

  totalRecords:any;
  page:Number=1

  constructor( private restAPIService : RestApiService, private router: Router) { }

  ngOnInit(): void {
    this.loadAllSubjects();
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
