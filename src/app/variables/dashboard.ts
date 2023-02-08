import {DashboardData} from '../interfaces/dashboard-data';
import {
    colors
  } from "./charts";
  
export const dashboardData : DashboardData = {
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


  export const monthlyIncomeChartOptionsData = {
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
  
  export const studentsRegChartOptionsData =  {
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