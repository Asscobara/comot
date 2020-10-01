import { Component, ChangeDetectorRef } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { SessionServiceService } from 'src/app/services/session-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AbsScreenComponent } from '../abs-screen/abs-screen.component';
import { IEvent, IUser } from 'src/shceme/IScheme';
import { InterfaceBase, IEventHelper } from 'src/shceme/shcemeHelper';
import { Format } from 'src/app/utils/format';
import { EventComponent } from 'src/app/forms/event/event.component';

@Component({
  selector: 'app-events',
  templateUrl: './../abs-screen/abs-screen.component.html',
  styleUrls: ['./../abs-screen/abs-screen.component.css', './events.component.css']
})
export class EventsComponent extends AbsScreenComponent<IEvent> {

  constructor (
    private dataSrv: DataService, 
    sessionSrv: SessionServiceService,    
    changeDetect: ChangeDetectorRef, 
    dialogSrv: MatDialog, 
    changeDetector: ChangeDetectorRef,
    deviceDetectorService: DeviceDetectorService) {
    super(dialogSrv, changeDetect, EventComponent, sessionSrv, changeDetector, deviceDetectorService); 
  }

  protected buildGridData() {
    this.gridData = {
      title: $localize`Events`,
      columns: [
        {displayName: '#', fieldName: 'id'},
        {displayName: $localize`Name`, fieldName: 'name'},
        {displayName: $localize`Created Date`, fieldName: 'create_date', fieldNameSource: (date) => Format.formatDate(new Date(date))},
        {displayName: $localize`Remark`, fieldName: 'remark'},
        {displayName: $localize`Status`, fieldName: 'status_id', fieldNameSource: (statusId) => this.sessionSrv.eventStatuses[statusId].displayName},
        {displayName: $localize`Invite`, fieldName: 'user_ids', fieldNameSource: (users: IUser[]) => users.map( (user: IUser) => `${user.last_name} ${user.first_name}`).join(',') }
      ],
      rows: [],
      buttons: [
        { title: $localize`New`, action: 'new', icon: 'add_circle_outline' }, 
        { title: $localize`Delete`, action: 'delete', icon: 'remove_circle_outline' }
      ],
      canEditData: this.sessionSrv.user?.role_id == 2
    }

    this.data.forEach( (event: IEvent) => {
      this.gridData.rows.push(event);
    });
  }

  protected getEmptyT(): IEvent {
    return InterfaceBase.getEmptyT(new IEventHelper());   
  }

  protected async loadData() {
    if (this.sessionSrv.address) {
      const data = await this.dataSrv.getEvents(this.sessionSrv.address.id)
       if (data) {
        (data as any).data.forEach(d => {
          const user_ids = d.user_ids.split(',');
          d.user_ids = this.sessionSrv.users.map(u => u ).filter(f => user_ids.findIndex(id => f.id == +id) > -1);
        })
      }
      return data;
    }
    return null;
  }

  protected update(event: IEvent) {
    return this.dataSrv.updateEvent(event);
  }

  protected create(event: IEvent) {
    event.address_id = this.sessionSrv.address.id;
    return this.dataSrv.createEvent(event);
  }

  protected delete(eventId: number) {
    return this.dataSrv.deleteEvent(eventId);
  }
}
