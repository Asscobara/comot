import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AbsScreenComponent } from '../abs-screen/abs-screen.component';
import { ITask } from 'src/shceme/IScheme';
import { DataService } from 'src/app/services/data.service';
import { SessionServiceService } from 'src/app/services/session-service.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskComponent } from 'src/app/forms/task/task.component';
import { NodeWithI18n } from '@angular/compiler';
import { Format } from 'src/app/utils/format';

@Component({
  selector: 'app-tasks',
  templateUrl: './../abs-screen/abs-screen.component.html',
  styleUrls: ['./../abs-screen/abs-screen.component.css']
})
export class TasksComponent extends AbsScreenComponent<ITask>  {

  constructor (
    private dataSrv: DataService, 
    sessionSrv: SessionServiceService,    
    changeDetect: ChangeDetectorRef, 
    dialogSrv: MatDialog) {
    super(dialogSrv, changeDetect, TaskComponent, sessionSrv); 
  }

  protected buildGridData() {
    this.gridData = {
      columns: [
        {displayName: '#', fieldName: 'id'},
        {displayName: $localize`Category`, fieldName: 'category_id', fieldNameSource: (categoryId) => this.sessionSrv.categories[categoryId].displayName},
        {displayName: $localize`Description`, fieldName: 'description'},
        {displayName: $localize`Reported by`, fieldName: 'user_id'},
        {displayName: $localize`Do by`, fieldName: 'sipplier_id'},
        {displayName: $localize`Status`, fieldName: 'status_id'},
        {displayName: $localize`Created Date`, fieldName: 'create_date', fieldNameSource: (date) => Format.formatDate(new Date(date))},
        {displayName: $localize`Last Updated`, fieldName: 'update_date', fieldNameSource: (date) => Format.formatDate(new Date(date))},
        {displayName: $localize`Grade`, fieldName: 'grade'},
        {displayName: $localize`Price`, fieldName: 'price'},

      ],
      rows: [],
      buttons: [
        { title: $localize`New`, action: 'new', icon: 'add_circle_outline' }, 
        { title: $localize`Delete`, action: 'delete', icon: 'remove_circle_outline' }
      ],
      canEditData: this.sessionSrv.user?.role_id == 2
    }

    this.data.forEach( (task: ITask) => {
      this.gridData.rows.push(task);
    });
  }

  protected getEmptyT(): ITask {
    return {
      id: 0,
      category_id: 0,
      user_id: 0,
      status_id: 0, 
      sipplier_id: 0, 
      create_date: new Date(),
      update_date: new Date(),
      schedule_id: {
        id: 0,
        start_date: new Date(),
        end_date: new Date(),
        recuring: false,
        recuring_every_in_days: 0  
      },
      grade: 0,
      price: 0,
      address_id: 0,
      description: ''
    }
  }

  protected async loadData() {
    return this.dataSrv.getTasks(this.sessionSrv.address);
  }

  protected update(task: ITask) {
    return this.dataSrv.updateTask(task);
  }

  protected create(task: ITask) {
    task.user_id = this.sessionSrv.user.id;
    task.address_id = this.sessionSrv.address.id;
    return this.dataSrv.createTask(task);
  }

  protected delete(taskId: number) {
    return this.dataSrv.deleteTask(taskId);
  }

}
