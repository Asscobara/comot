import { Component, ChangeDetectorRef } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { UserComponent } from 'src/app/forms/user/user.component';
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
    sessionSrv: SessionServiceService,    
    changeDetect: ChangeDetectorRef, 
    dialogSrv: MatDialog) {
    super(dialogSrv, changeDetect, UserComponent, sessionSrv); 
  }

  protected buildGridData() {
    this.gridData = {
      columns: [
        {displayName: '#', fieldName: 'id'},
        {displayName: $localize`First Name`, fieldName: 'first_name'},
        {displayName: $localize`Last Name`, fieldName: 'last_name'},
        {displayName: $localize`Email`, fieldName: 'email'},
        {displayName: $localize`Phone`, fieldName: 'phone'},
        {displayName: $localize`Floor`, fieldName: 'floor_number'},
        {displayName: $localize`Apartment`, fieldName: 'apartment_number'},
        {displayName: $localize`Role`, fieldName: 'role_id', fieldNameSource: (roleId) => this.sessionSrv.roles[roleId].displayName }],
      rows: [],
      buttons: [
        { title: $localize`New`, action: 'new', icon: 'add_circle_outline' }, 
        { title: $localize`Delete`, action: 'delete', icon: 'remove_circle_outline' }
      ],
      canEditData: this.sessionSrv.user?.role_id == 2
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
      address_id: 0,
      floor_number: 0,
      apartment_number: 0,
      registered: false
    }
  }

  protected async loadData() {
    return this.dataSrv.getUsers(this.sessionSrv.user);
  }

  protected update(data: IUser) {
    return this.dataSrv.updateUser(data);
  }

  protected create(data: IUser) {
    data.address_id = this.sessionSrv.user.address_id;
    return this.dataSrv.createUser(data);
  }

  protected delete(id: number) {
    return this.dataSrv.deleteUser(id);
  }

}

