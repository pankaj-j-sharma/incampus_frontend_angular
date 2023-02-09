import {DashboardData} from '../interfaces/dashboard-data';
import {
    colors
  } from "./charts";
  
export const dashboardData : DashboardData = {
    DashboardStats:[
      {
        title : "Students",
        span_text : "34,569",
        description1 : "3.48",
        description2 : "Since last month",
        description_class : "fa fa-arrow-up",
        icon_div_class : "icon icon-shape bg-danger text-white rounded-circle shadow",      
        icon_class : "fas fa-chart-bar"      
      },
      {
        title : "Teachers",
        span_text : "2,356",
        description1 : "3.48%",
        description2 : "Since last month",
        description_class : "fas fa-arrow-down",
        icon_div_class : "icon icon-shape bg-warning text-white rounded-circle shadow",      
        icon_class : "fas fa-chart-pie"      
      },
      {
        title : "Income",
        span_text : "2,30,456 &#8377;",
        description1 : "1.10%",
        description2 : "Since last month",
        description_class : "fas fa-arrow-down",
        icon_div_class : "icon icon-shape bg-yellow text-white rounded-circle shadow",      
        icon_class : "fas fa-users"      
      },
      {
        title : "Expenses",
        span_text : "1,79,900 &#8377;",
        description1 : "12%",
        description2 : "Since last month",
        description_class : "fas fa-arrow-up",
        icon_div_class : "icon icon-shape bg-info text-white rounded-circle shadow",      
        icon_class : "fas fa-percent"      
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