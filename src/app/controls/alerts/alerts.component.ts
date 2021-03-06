import { Component, OnInit, ViewChild, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { SessionServiceService } from 'src/app/services/session-service.service';
import { IAlert } from 'src/shceme/IScheme';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertsDialogComponent } from './alerts-dialog/alerts-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ITaskHelper } from 'src/shceme/shcemeHelper';
import { formatDate } from '@angular/common';
import { Format } from 'src/app/utils/format';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit, OnDestroy {

  public alerts: IAlert[] =[];
  public newAlertsCount: number;
  @ViewChild('mainButton', { static: false }) public mainButtonRef: ElementRef;
  
  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.clickoutHandler) {
      this.clickoutHandler(event);
    }
  }

  clickoutHandler: Function;
  dialogRef: MatDialogRef<AlertsDialogComponent>;
  private readonly requestAlertsIntervalImMin = 1000 * 60;  
  requestAlertsInterval: any;

  constructor(
    private dataSrv: DataService, 
    private sessionSrv: SessionServiceService, 
    private dialogSrv: MatDialog,
    private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.dataSrv.getAlerts(this.sessionSrv?.user?.id).then( (alerts) => this.setAlerts((alerts as any).data, false));
    this.requestAlertsInterval = setInterval(() => {
        this.dataSrv.getAlerts(this.sessionSrv?.user?.id).then( (alerts) => this.setAlerts((alerts as any).data, true));
      }, this.requestAlertsIntervalImMin
    );    
  }

  ngOnDestroy() {
    clearInterval(this.requestAlertsInterval);
  }

  public openAlerts() {

    this.dialogRef?.close();
    this.dialogRef = this.dialogSrv.open(AlertsDialogComponent, {
      data: {
        alerts: this.alerts,
        positionRelativeToElement: this.mainButtonRef,
        getAlertText: (alert: IAlert) => this.getAlertText(alert),
        getAlertIcon: (alert: IAlert) => this.getAlertIcon(alert)
      },
      hasBackdrop: false,
      maxHeight: '80vh',
    });
    
    this.dialogRef.componentInstance.onDeleteAlert = () => {
      this.dataSrv.getAlerts(this.sessionSrv?.user?.id).then((alerts) => {
        this.alerts = (alerts as any).data;
        this.newAlertsCount = this.alerts.filter(a => a.status_id == 1).length;
        this.dialogRef.close();
      });
    };

    this.dialogRef.afterClosed().subscribe( () =>  {                
      this.clickoutHandler = null;
      this.alerts.forEach( async (alert: IAlert) => {
        alert.status_id = 2; // Update alerts status to 'read'
        await this.dataSrv.updateAlert(alert);
      });
    });  

    this.dialogRef.afterOpened().subscribe(() => {
      this.clickoutHandler = this.closeDialogFromClickout;
    });

  }

  closeDialogFromClickout(event: MouseEvent) {
    const matDialogContainerEl = this.dialogRef.componentInstance.hostElement.nativeElement.parentElement;
    const rect = matDialogContainerEl.getBoundingClientRect()
    if(event.clientX <= rect.left || event.clientX >= rect.right || 
        event.clientY <= rect.top || event.clientY >= rect.bottom) {
      this.dialogRef.close();
    }
  }

  setAlerts(alerts: IAlert[], openSnackbar: boolean) {
    
    this.alerts = alerts;
    this.newAlertsCount = this.alerts.filter(a => a.status_id == 1).length;

    if (openSnackbar) {
      let snackBarMessage = '';
      alerts.forEach((alert: IAlert) => {
        if (alert.status_id == 1) {
          snackBarMessage = `* ${this.getAlertText(alert)} * ${snackBarMessage}`;
        }        
      });
      if (snackBarMessage != '') {
        this.snackBar.open(snackBarMessage, '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-style']
        });      
      }
    }

    if (this.dialogRef && this.dialogRef.componentInstance) {
      this.dialogRef.componentInstance.data.alerts = alerts;
    }         
            
  }

  public getAlertIcon(alert: IAlert) {
    switch (alert.code_id) {
      case 1: return 'payment';
      case 2: return 'event';
      case 3: 
      case 4: return 'fact_check';
    }
    return '';
  }

  public getAlertText(alert: IAlert) {
    
    const alertInfo = JSON.parse(alert.message);

    switch (alert.code_id) {
      case 1: {
        const user = this.sessionSrv.users?.find(u => u.id == alertInfo.userId);
        return $localize`Resident ${user?.first_name}:INTERPOLATION: ${user?.last_name}:INTERPOLATION1: missed payment for ${+alertInfo?.month+1}:INTERPOLATION2: month.`;
      }
      case 2: {
        const user = this.sessionSrv.users?.find(u => u.id == alert.sendto_user_id);
        return $localize`Resident ${user?.first_name}:INTERPOLATION: ${user?.last_name}:INTERPOLATION1: was notify about '${alertInfo?.remark}:INTERPOLATION2:' event.`;
      }
      case 3: 
      case 4: 
        return $localize`Task #${alertInfo?.id}:INTERPOLATION: ${alertInfo?.description}:INTERPOLATION1: status has not changed since ${Format.formatDate(new Date(alertInfo?.create_date))}:INTERPOLATION2:`;
    }
    return '';
  }
}
