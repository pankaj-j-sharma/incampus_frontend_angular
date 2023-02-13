import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/services/rest-api/rest-api.service';

@Component({
  selector: 'app-subject-route',
  templateUrl: './subject-route.component.html',
  styleUrls: ['./subject-route.component.css']
})
export class SubjectRouteComponent implements OnInit {

  processing=false;

  constructor(private restAPIService : RestApiService, private router: Router) { }

  ngOnInit(): void {
  }

}
