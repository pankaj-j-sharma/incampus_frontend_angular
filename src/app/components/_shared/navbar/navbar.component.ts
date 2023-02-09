import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { RestApiService } from 'src/services/rest-api/rest-api.service';

export interface IncampusUser {
  FirstName : string
  LastName : string
  FullName : string
  ProfilePic : string
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  logged_user : IncampusUser = {
    FirstName:"Incampus",
    LastName:"Admin",
    FullName:"Incampus Admin",
    ProfilePic:"assets/img/theme/team-4-800x800.jpg"
  } ;
  constructor(location: Location,  private element: ElementRef, private router: Router, private restAPIService : RestApiService) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

  // logoutUser(){
  //   this.restAPIService.clearLoginToken().subscribe(resp =>{
  //     this.router.navigate(['/login?loggedout=true']);
  //   });
  // }

}
