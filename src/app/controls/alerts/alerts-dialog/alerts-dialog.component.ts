import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { IAlert } from 'src/shceme/IScheme';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { SessionServiceService } from 'src/app/services/session-service.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-alerts-dialog',
  templateUrl: './alerts-dialog.component.html',
  styleUrls: ['./alerts-dialog.component.css']
})
export class AlertsDialogComponent implements OnInit {

  public onDeleteAlert: () => void;

  constructor(
    public hostElement: ElementRef,
    public dialogRef: MatDialogRef<AlertsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sessionSrv: SessionServiceService, 
    private dataSrv: DataService) { 

  }

  ngOnInit(): void {
    const matDialogConfig = new MatDialogConfig();
    const rect: DOMRect = this.data.positionRelativeToElement._elementRef.nativeElement.getBoundingClientRect();

    matDialogConfig.position = { left: `10px`, top: `${rect.bottom + 2}px` };
    
    this.dialogRef.updatePosition(matDialogConfig.position);
  }

  public getAlertIcon(alert: IAlert) {
    return this.data.getAlertIcon(alert);
  }

  public getAlertText(alert: IAlert) {
    return this.data.getAlertText(alert);
  }

  public deleteAlert(alert: IAlert) {
    this.dataSrv.deleteAlert(alert.id).then( () => {      
      this.data.alerts = this.data.alerts.filter(a => a.id != alert.id);
      if (this.onDeleteAlert) {
        this.onDeleteAlert();
      }
    });
  }

  public deleteAll() {
    const delteRequests = [];
    this.data.alerts.forEach(alert => {
      delteRequests.push(this.dataSrv.deleteAlert(alert.id));
    });

    Promise.all(delteRequests).then(() => {
      this.data.alerts = [];
      if (this.onDeleteAlert) {
        this.onDeleteAlert();
      }
    });
  }

}
