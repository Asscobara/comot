import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { IAlert } from 'src/shceme/IScheme';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { SessionServiceService } from 'src/app/services/session-service.service';

@Component({
  selector: 'app-alerts-dialog',
  templateUrl: './alerts-dialog.component.html',
  styleUrls: ['./alerts-dialog.component.css']
})
export class AlertsDialogComponent implements OnInit {

  constructor(
    public hostElement: ElementRef,
    public dialogRef: MatDialogRef<AlertsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sessionSrv: SessionServiceService) { 

  }

  ngOnInit(): void {
    const matDialogConfig = new MatDialogConfig();
    const rect: DOMRect = this.data.positionRelativeToElement._elementRef.nativeElement.getBoundingClientRect();

    matDialogConfig.position = { left: `10px`, top: `${rect.bottom + 2}px` };
    
    this.dialogRef.updatePosition(matDialogConfig.position);
  }

  public getAlertIcon(alert: IAlert) {
    switch (alert.code_id) {
      case 1: return 'payment';
    }
    return '';
  }

  public getAlertText(alert: IAlert) {
    switch (alert.code_id) {
      case 1: {
        const alertInfo = JSON.parse(alert.message);
        const user = this.sessionSrv.users.find(u => u.id == alertInfo.userId);
        return $localize`Resident ${user.first_name}:INTERPOLATION: ${user.last_name}:INTERPOLATION1: missed payment for ${alertInfo.month}:INTERPOLATION2: month.`;
      }
      
    }
    return '';
  }

}
