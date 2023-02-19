import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FriendsData } from 'src/app/interfaces/friends-data';
import { RestApiService } from 'src/services/rest-api/rest-api.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {

  processing=false;
  friendDataList : FriendsData[];

  totalRecords:any;
  page:Number=1

  constructor( private restAPIService : RestApiService, private router: Router) { }

  ngOnInit(): void {
    this.loadMyFriends();
  }

  loadMyFriends(){
    this.processing=true;
    this.restAPIService.getMyFriends().subscribe(
    
    {
      next: (resp) => {
        console.log("loadMyFriends resp",resp);
        if(resp){
          this.friendDataList = resp;
          this.totalRecords = this.friendDataList.length;
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
