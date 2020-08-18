import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { SessionServiceService } from 'src/app/services/session-service.service';
import { IPaymentReport, ISuppliersReport, ITaskReport } from 'src/shceme/IScheme';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css', './../abs-screen/abs-screen.component.css']
})
export class ReportsComponent implements OnInit {

  public payments: IPaymentReport[];
  public suppliers: ISuppliersReport[];
  public tasks: ITaskReport[];

  private canvas: HTMLCanvasElement;
  private ctx;

  constructor(
    private dataSrv: DataService, 
    private sessionSrv: SessionServiceService) {
    
  }

  ngOnInit(): void {
    this.dataSrv.getPaymentsStatus(this.sessionSrv.address.id, '1-1-2001').then(res => {
      this.payments = (res as any).data;
    });

    this.dataSrv.getSupliersReport(this.sessionSrv.address.id).then(res => {
      this.suppliers = (res as any).data;
      this.setSuppliersChart();
    });

    this.dataSrv.getTasksReport(this.sessionSrv.address.id).then(res => {
      this.tasks = (res as any).data;
      this.setTasksChart();
    });
  
  }

  private setTasksChart() {
    this.setChart(
      'tasks_chart', 
      this.tasks.map(t => this.sessionSrv.taskStatuses[t.status_id].displayName), 
      $localize`Tasks Summary`, 
      this.tasks.map(t => t.total_tasks), 
      'bar'
    );
  }
  
  private setSuppliersChart() {
    this.setChart(
      'suppliers_chart', 
      this.suppliers.map(s => this.sessionSrv.categories[s.category_id].displayName), 
      $localize`Suppliers Summary`, 
      this.suppliers.map(s => s.total_suppliers), 
      'bar'
    );
  }

  private setChart(elementId: string, labels: string[], title: string, data: any[], type: string) {
    this.canvas = document.getElementById(elementId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: type,
      data: {
          labels:  labels,
          datasets: [{
              label: title,
              data: data,
              backgroundColor: ["red", "green" , "blue", "brown", , , , , "orange"],
              borderWidth: 1
          }]
      },
      options: {
        legend: { 
          display: false 
        },
        responsive: false,
        display:true
      }
    });
  }

}
