import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  colors
} from "../../variables/charts";

export interface DashboardStatistics {
  Title : string
  SpanText : string
  Description1 : string
  Description2 : string
  DescriptionClass : string
  IconDivClass : string
  IconClass : string
}


export interface DashboardData {
  DashboardStats : DashboardStatistics[]
}


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
    DashboardStats:[
      {
        Title : "Students",
        SpanText : "34,569",
        Description1 : "3.48",
        Description2 : "Since last month",
        DescriptionClass : "fa fa-arrow-up",
        IconDivClass : "icon icon-shape bg-danger text-white rounded-circle shadow",      
        IconClass : "fas fa-chart-bar"      
      },
      {
        Title : "Teachers",
        SpanText : "2,356",
        Description1 : "3.48%",
        Description2 : "Since last month",
        DescriptionClass : "fas fa-arrow-down",
        IconDivClass : "icon icon-shape bg-warning text-white rounded-circle shadow",      
        IconClass : "fas fa-chart-pie"      
      },
      {
        Title : "Income",
        SpanText : "2,30,456 &#8377;",
        Description1 : "1.10%",
        Description2 : "Since last month",
        DescriptionClass : "fas fa-arrow-down",
        IconDivClass : "icon icon-shape bg-yellow text-white rounded-circle shadow",      
        IconClass : "fas fa-users"      
      },
      {
        Title : "Expenses",
        SpanText : "1,79,900 &#8377;",
        Description1 : "12%",
        Description2 : "Since last month",
        DescriptionClass : "fas fa-arrow-up",
        IconDivClass : "icon icon-shape bg-info text-white rounded-circle shadow",      
        IconClass : "fas fa-percent"      
      },
    ]

  }


  monthlyIncomeChartOptionsData = {
    options: {
      scales: {
        yAxes: [{
          gridLines: {
            color: colors.gray[900],
            zeroLineColor: colors.gray[900],
            drawOnChartArea: false
          },
          ticks: {
            callback: function(value) {
              if (!(value % 10)) {
                return '₹' + value + 'k';
              }
            }
          }
        }]
      }
    },
    data: {
      labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: '',
        data: [0, 20, 10, 30, 15, 40, 20, 60, 60]
      }]
    }
  }
  
  studentsRegChartOptionsData =  {
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              callback: function(value) {
                if (!(value % 10)) {
                  //return '$' + value + 'k'
                  return value;
                }
              }
            }
          }
        ]
      },
      tooltips: {
        callbacks: {
          label: function(item, data) {
            var label = data.datasets[item.datasetIndex].label || "";
            var yLabel = item.yLabel;
            var content = "";
            if (data.datasets.length > 1) {
              content += label;
            }
            content += yLabel;
            return content;
          }
        }
      }
    },
    data: {
      labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Registration",
          data: [25, 20, 30, 22, 17, 29],
          maxBarThickness: 10
        }
      ]
    }
  }

  ngOnInit() {

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];
    parseOptions(Chart, chartOptions());

    var chartStudentsReg = document.getElementById('chart-students-registered');

    var studentsRegChart = new Chart(chartStudentsReg, {
      type: 'bar',
      options: this.studentsRegChartOptionsData.options,
      data: this.studentsRegChartOptionsData.data
    });

    var chartMonthlyIncome = document.getElementById('chart-monthly-income');

    this.monthlyIncomeChart = new Chart(chartMonthlyIncome, {
			type: 'line',
			options: this.monthlyIncomeChartOptionsData.options,
			data: this.monthlyIncomeChartOptionsData.data
		});
  }


  public updateOptions() {
    this.monthlyIncomeChart.data.datasets[0].data = this.data;
    this.monthlyIncomeChart.update();
  }

}
