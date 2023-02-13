import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfile } from 'src/app/interfaces/user-profile';
import { RestApiService } from 'src/services/rest-api/rest-api.service';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  processing=false;
  formData: FormData = new FormData();
  profileForm:FormGroup;

  userProfileData : UserProfile = {
    id : -1,
    first_name:"",
    last_name:"",
    address : "",
    email : "",
    gender : "",
    incampus_type : "",
    phone_no : "",
    profilepic:"",
    username: "",
    job:"",
    city : "",
    country : "",
    dob : "",
    postal_code : "",
    about_me : "",
    age:0
  };

  constructor(private restAPIService : RestApiService,private router: Router) { }

  ngOnInit() {
    this.loadUserProfile();
    this.createForm();
  }

  createForm(){

    this.profileForm = new FormGroup({
      username: new FormControl(this.userProfileData.username),
      email: new FormControl(this.userProfileData.email),
      first_name: new FormControl(this.userProfileData.first_name),
      last_name: new FormControl(this.userProfileData.last_name),
      address: new FormControl(this.userProfileData.address),
      city: new FormControl(this.userProfileData.city),
      country: new FormControl(this.userProfileData.country),
      postal_code: new FormControl(this.userProfileData.postal_code),
      about_me: new FormControl(this.userProfileData.about_me),
   });
  }

  patchForm(){
    this.profileForm.patchValue({
      username:this.userProfileData.username,
      email:this.userProfileData.email,
      first_name:this.userProfileData.first_name,
      last_name:this.userProfileData.last_name,
      address:this.userProfileData.address,
      city:this.userProfileData.city,
      country:this.userProfileData.country,
      postal_code:this.userProfileData.postal_code,
      about_me:this.userProfileData.about_me
    })
  }

  loadUserProfile(){
    this.processing=true;
    this.restAPIService.getUserProfile().subscribe(
    
    {
      next: (resp) => {
        console.log("loadUserProfile resp",resp);
        if(resp){
          this.userProfileData = resp;
          this.patchForm();
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
  
  updateUserProfile(){
    let userprofile = this.profileForm.value;
    this.processing = true;

    this.restAPIService.updateUserProfile(userprofile).subscribe(
    
      {
        next: (resp) => {
          console.log("loadUserProfile resp",resp);
          if(resp){
            this.userProfileData = resp;
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

}
