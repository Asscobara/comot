import { Component, ChangeDetectorRef } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { UserComponent } from 'src/app/forms/user/user.component';
import { DialogComponent } from 'src/app/controls/dialog/dialog.component';
import { IUser } from 'src/shceme/IScheme';
import { AbsScreenComponent } from '../abs-screen/abs-screen.component';
import { SessionServiceService } from 'src/app/services/session-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './../abs-screen/abs-screen.component.html',
  styleUrls: ['./../abs-screen/abs-screen.component.css']
})
export class UsersComponent extends AbsScreenComponent<IUser> {

  constructor (
    private dataSrv: DataService, 
    private sessionSrv: SessionServiceService,    
    changeDetect: ChangeDetectorRef, 
    dialogSrv: MatDialog) {
    super(dialogSrv, changeDetect, UserComponent); 
  }

  protected buildGridData() {
    this.gridData = {
      columns: [
        {displayName: '#', fieldName: 'id'},
        {displayName: $localize`First Name`, fieldName: 'first_name'},
        {displayName: $localize`Last Name`, fieldName: 'last_name'},
        {displayName: $localize`Email`, fieldName: 'email'},
        {displayName: $localize`Phone`, fieldName: 'phone'},
        {displayName: $localize`Role`, fieldName: 'role_id', fieldNameSource: (roleId) => this.sessionSrv.roles[roleId].displayName }],
      rows: [],
      buttons: [
        { title: $localize`New`, action: 'new', icon: 'add_circle_outline' }, 
        { title: $localize`Delete`, action: 'delete', icon: 'remove_circle_outline' }
      ],
      canSelectItem: true
    }

    this.data.forEach( (user: IUser) => {
      this.gridData.rows.push(user);
    });
  }

  protected getEmptyT(): IUser {
    return {
      id: 0,
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      is_logged_in: false, 
      remark: '',
      role_id: 3,
      phone: '',
      address_id: 0
    }
  }

  protected async loadData() {
    return this.dataSrv.getUsers();
  }

  protected update(data: IUser) {
    return this.dataSrv.updateUser(data);
  }

  protected create(data: IUser) {
    return this.dataSrv.createUser(data);
  }

  protected delete(id: number) {
    return this.dataSrv.deleteUser(id);
  }

}

