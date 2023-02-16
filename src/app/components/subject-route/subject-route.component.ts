import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubjectRouteData } from 'src/app/interfaces/subject-route-data';
import { RestApiService } from 'src/services/rest-api/rest-api.service';

@Component({
  selector: 'app-subject-route',
  templateUrl: './subject-route.component.html',
  styleUrls: ['./subject-route.component.css']
})
export class SubjectRouteComponent implements OnInit {

  processing=false;
  subjectRouteDataList : SubjectRouteData[];

  totalRecords:any;
  page:Number=1

  constructor( private restAPIService : RestApiService, private router: Router) { }

  ngOnInit(): void {
    this.loadAllSubjectRoutes();
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
