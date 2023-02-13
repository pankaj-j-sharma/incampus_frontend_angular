import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/services/rest-api/rest-api.service';

@Component({
  selector: 'app-incampus-event',
  templateUrl: './incampus-event.component.html',
  styleUrls: ['./incampus-event.component.css']
})
export class IncampusEventComponent implements OnInit {

  processing=false;

  constructor(private restAPIService : RestApiService, private router: Router) { }

  ngOnInit(): void {
  }

}
