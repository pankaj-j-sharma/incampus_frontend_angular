import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/services/rest-api/rest-api.service';
import { GradeData } from 'src/app/interfaces/grade-data';


@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit {

  processing=false;
  gradeDataList : GradeData[];

  totalRecords:any;
  page:Number=1

  constructor( private restAPIService : RestApiService, private router: Router) { }

  ngOnInit(): void {
    this.loadAllGrades();
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
