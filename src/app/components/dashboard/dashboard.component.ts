import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js';
import { DashboardData } from 'src/app/interfaces/dashboard-data';
import { RestApiService } from 'src/services/rest-api/rest-api.service';

// core components
import {
  chartOptions,
  parseOptions,
  colors
} from "../../variables/charts";

import {
  studentsRegChartOptionsData,
  monthlyIncomeChartOptionsData,
  dashboardData
} from "../../variables/dashboard";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public monthlyIncomeChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  dashboardData : DashboardData = {
    DashboardStats:[]
  };
  processing=false;

  constructor(private restAPIService : RestApiService, private router: Router) { }

  ngOnInit() {

    this.loadDashboardData();

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];
    parseOptions(Chart, chartOptions());

    var chartStudentsReg = document.getElementById('chart-students-registered');

    var studentsRegChart = new Chart(chartStudentsReg, {
      type: 'bar',
      options: studentsRegChartOptionsData.options,
      data: studentsRegChartOptionsData.data
    });

    var chartMonthlyIncome = document.getElementById('chart-monthly-income');

    this.monthlyIncomeChart = new Chart(chartMonthlyIncome, {
			type: 'line',
			options: monthlyIncomeChartOptionsData.options,
			data: monthlyIncomeChartOptionsData.data
		});
  }


  public updateOptions() {
    this.monthlyIncomeChart.data.datasets[0].data = this.data;
    this.monthlyIncomeChart.update();
  }

  loadDashboardData(){
    this.processing=true;
    this.restAPIService.getDashboardData().subscribe(
    {
      next: (resp) => {
        console.log("getDashboardData resp",resp);
        if ('success' in resp){
          let results = resp.results;
          console.log("results",results);
          this.dashboardData.DashboardStats = results.card_data;
        }
        this.processing=false;
      },
      error: (err) => {
        this._handleObserverError(err);
      },
      complete: () => console.info('complete')
    });
  }

  private _handleObserverError(err:any){
    console.error("err status",err.status);
    if(err.status==401){
      this.router.navigate(['/login'],{ queryParams: {loggedout: true,}});
    }

  }

}
