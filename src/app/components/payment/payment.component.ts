import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentPaymentData ,AllPaymentData} from 'src/app/interfaces/payment-data';
import { RestApiService } from 'src/services/rest-api/rest-api.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {


  processing=false;
  studentPaymentDataList : StudentPaymentData[];
  allPaymentDataList : AllPaymentData[];

  totalStudentPaymentRecords:any;
  totalAllPaymentRecords:any;
  page:Number=1

  constructor( private restAPIService : RestApiService, private router: Router) { }

  ngOnInit(): void {
    this.loadStudentsPayments();       
  }

  loadAllPayments(){
    this.processing=true;
    this.restAPIService.getAllPayments().subscribe(
    
    {
      next: (resp) => {
        console.log("loadAllPayments resp",resp);
        if(resp){
          this.allPaymentDataList = resp;
          this.totalAllPaymentRecords = this.allPaymentDataList.length;
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

  loadStudentsPayments(){
    this.processing=true;
    this.restAPIService.getStudentsPayments().subscribe(
    
    {
      next: (resp) => {
        console.log("loadStudentsPayments resp",resp);
        if(resp){
          this.studentPaymentDataList = resp;
          this.totalStudentPaymentRecords = this.studentPaymentDataList.length;          
          this.loadAllPayments(); 
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
