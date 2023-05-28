import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { ComponentService } from 'src/app/core/services/component.service';
import { Chart, ChartConfiguration, ChartData, ChartEvent, ChartDataset, ChartType, ChartOptions, registerables } from 'chart.js';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
// import { ChartDataSets, ChartOptions } from 'chart.js';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  name_task: any = 'Bảng điều khiên';
  title = 'Bảng điều khiển';
  product: any;
  order: any;
  customer: any;
  revenu: any;
  constructor(
    private data_service: ComponentService,
    private admin: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private _router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.get_statistical();
    // this.name_task
    this.send_title();
    console.log(this.name_task);
    Chart.register(...registerables);

    this.admin.get_dashboard_daily().subscribe((data: any[]) => {
      const chartData = {
        labels: data.map(item => item.date),
        datasets: [
          {
            label: 'Daily Revenue',
            data: data.map(item => item.revenue),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      };
      console.log('data daily', data);
      // Gọi hàm vẽ biểu đồ cột với dữ liệu chartData
      // this.drawBarChart(chartData);
    })
  }
  // gửi title đi
  send_title() {
    this.data_service.Title_message(this.title);
    // console.log('data',this.data_service.Title_message('Danh111'));
  }

  get_statistical() {
    this.admin.get_dashboard().subscribe(
      (data: any) => {
        this.product = data.product;
        this.order = data.order;
        this.customer = data.customer;
        this.revenu = data.revenue.revenue;
        console.log('111', this.revenu);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  @ViewChild('lineChart') lineChart!: ElementRef;
  @ViewChild('revenueChart') revenueChart!: ElementRef;
  @ViewChild('stackedChart') stackedChart!: ElementRef;
  @ViewChild('test') test!: ElementRef;
  @ViewChild('barChart') barChart!: ElementRef;
  // ngAfterViewInit() {

  // }
// biểu đồ cột
  drawBarChart(chartData: any) {
    // const chart = this.barChart.nativeElement.getContext('2d');
    // new Chart(chart, {
    //   type: 'bar',
    //   data: {
    //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //     datasets: [
    //       {
    //         label: 'Series A',
    //         data: [65, 59, 80, 81, 56, 55, 40],
    //         backgroundColor: 'rgba(75, 192, 192, 0.2)',
    //         borderColor: 'rgba(75, 192, 192, 1)',
    //         borderWidth: 1
    //       }
    //     ]
    //   },
    //   options: {
    //     responsive: true
    //   }
    // });
    const canvas = this.barChart.nativeElement.getContext('2d');
    new Chart(canvas, {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true
      }
    });
  }

  ngAfterViewInit() {
    const lineCtx = this.lineChart.nativeElement.getContext('2d');
    new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          { label: 'Series A', data: [65, 59, 80, 81, 56, 55, 40] },
          { label: 'Series B', data: [28, 48, 40, 19, 86, 27, 90] }
        ]
      },
      options: {
        responsive: true
      }
    });
    const revenueCtx = this.revenueChart.nativeElement.getContext('2d');
    new Chart(revenueCtx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Revenue',
            data: [1000, 1500, 1200, 2000, 1800, 2500, 2100],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Revenue'
            }
          }
        }
      }
    });
    const ctx = this.stackedChart.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],// tháng
        datasets: [
          {
            label: 'Series A',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          },
          {
            label: 'Series B',
            data: [28, 48, 40, 19, 86, 27, 90],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          },
          {
            label: 'Series C',
            data: [45, 25, 67, 32, 70, 50, 75],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          }
        }
      }
    });

    // const ctx2 = this.test.nativeElement.getContext('2d');
    // new Chart(ctx2, {
    //   type: 'scatter',
    //   data: {
    //     labels: [
    //       'January',
    //       'February',
    //       'March',
    //       'April'
    //     ],
    //     datasets: [{
    //       type: 'bar',
    //       label: 'Bar Dataset',
    //       data: [10, 20, 30, 40],
    //       borderColor: 'rgb(255, 99, 132)',
    //       backgroundColor: 'rgba(255, 99, 132, 0.2)'
    //     }, {
    //       type: 'line',
    //       label: 'Line Dataset',
    //       data: [50, 50, 50, 50],
    //       fill: false,
    //       borderColor: 'rgb(54, 162, 235)'
    //     }]
    //   },
    //   options: {
    //     scales: {
    //       y: {
    //         beginAtZero: true
    //       }
    //     }
    //   }
    // })


  }
}
