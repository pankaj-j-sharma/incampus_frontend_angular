import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/services/rest-api/rest-api.service';
import { ClassroomData } from 'src/app/interfaces/classroom-data';


@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit {

  processing=false;
  classroomDataList : ClassroomData[];

  totalRecords:any;
  page:Number=1

  constructor(private restAPIService : RestApiService, private router: Router) { }

  ngOnInit(): void {
    this.loadAllClassrooms();
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
