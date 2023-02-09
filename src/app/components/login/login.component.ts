import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/services/rest-api/rest-api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  formData: FormData = new FormData();

  constructor(private restAPIService : RestApiService, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      let loggedout = params['loggedout'];
      console.log("loggedout",params);
      if (this.restAPIService.hasLoginToken() && !loggedout) {
        console.log("has login token");
        this._handleLoginSuccess();
      }       
  });    
  }
  ngOnDestroy() {
    console.log("ngOnDestroy called");
  }

  validate(data:any){
    this.restAPIService.loginUser(data).subscribe(resp=>{
      if ('access' in resp){
        this.restAPIService.saveLoginToken(resp);
        this._handleLoginSuccess();
      }
  });
  }

  private _handleLoginSuccess() {
    this.router.navigate(['/dashboard']);
  }

}
