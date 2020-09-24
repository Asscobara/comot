import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { SessionServiceService } from 'src/app/services/session-service.service';
import { IAlert } from 'src/shceme/IScheme';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertsDialogComponent } from './alerts-dialog/alerts-dialog.component';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  public alerts: IAlert[] =[];
  @ViewChild('mainButton', { static: false }) public mainButtonRef: ElementRef;
  
  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.clickoutHandler) {
      this.clickoutHandler(event);
    }
  }

  clickoutHandler: Function;
  dialogRef: MatDialogRef<AlertsDialogComponent>;
  
  constructor(
    private dataSrv: DataService, 
    private sessionSrv: SessionServiceService, 
    private dialogSrv: MatDialog) {

  }

  ngOnInit(): void {
    this.dataSrv.getAlerts(this.sessionSrv?.user?.id).then( (alerts) => this.alerts = (alerts as any).data);
  }

  public openAlerts() {

    this.dialogRef?.close();
    
    this.dialogRef = this.dialogSrv.open(AlertsDialogComponent, {
      data: {
        alerts: this.alerts,
        positionRelativeToElement: this.mainButtonRef
      },
      hasBackdrop: false,
      maxHeight: '80vh',
    });
    
    this.dialogRef.afterClosed().subscribe( () =>  {                
        // Update alerts status to 'read'
      this.clickoutHandler = null;
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

}
