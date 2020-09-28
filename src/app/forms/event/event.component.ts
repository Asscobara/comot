import { Component, OnInit } from '@angular/core';
import { SessionServiceService } from 'src/app/services/session-service.service';
import { FormBaseClass } from 'src/app/controls/forms/formBaseClass';
import { IEvent } from 'src/shceme/IScheme';
import { IOption } from 'src/app/controls/forms/inputs/field/field.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/controls/dialog/dialog.component';
import { ScheduleComponent } from '../schedule/schedule.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent extends FormBaseClass<IEvent> implements OnInit {
  
  public eventStatusesOptions: IOption[];

  constructor(
    private dialogSrv: MatDialog,
    private sessionSrv: SessionServiceService) { 
      super();
  }

  ngOnInit(): void {

    this.eventStatusesOptions = [];

    Object.keys(this.sessionSrv.eventStatuses).forEach(t => {
      this.eventStatusesOptions.push({ value: this.sessionSrv.eventStatuses[t].dbId , displayValue: this.sessionSrv.eventStatuses[t].displayName});
    });

  }

  openSchedule() {
    this.dialogSrv.open(DialogComponent, {
      "minWidth": 250,
      "data": { 
        content: ScheduleComponent, 
        instanceContext: this.context.schedule_id, 
        title: $localize`Schedule`
      }
    }).afterClosed().subscribe( async (d: any) =>  {     
      if (d) {
        try {
            // const u = await this.dataSrv.register(d);
           // TODO: Show message
          } catch(err) {
          // d= err.statusText;          
          // this.openLoginDialog(d);
          }
        }
      });    
    }
}
