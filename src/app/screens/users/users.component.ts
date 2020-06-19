import { Component, ChangeDetectorRef } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { UserComponent } from 'src/app/forms/user/user.component';
import { DialogComponent } from 'src/app/controls/dialog/dialog.component';
import { IUser } from 'src/shceme/IScheme';
import { AbsScreenComponent } from '../abs-screen/abs-screen.component';

@Component({
  selector: 'app-users',
  templateUrl: './../abs-screen/abs-screen.component.html',
  styleUrls: ['./../abs-screen/abs-screen.component.css']
})
export class UsersComponent extends AbsScreenComponent<IUser> {

  constructor (private dataSrv: DataService, changeDetect: ChangeDetectorRef, dialogSrv: MatDialog) {
    super(dialogSrv, changeDetect, UserComponent); 
  }

  protected buildGridData() {
    this.gridData = {
      columns: [
        {displayName: '#', fieldName: 'id'},
        {displayName: 'First Name', fieldName: 'first_name'},
        {displayName: 'Last Name', fieldName: 'last_name'},
        {displayName: 'Email', fieldName: 'email'}],
      rows: [],
      buttons: [{ title: 'New', action: 'new' }, { title: 'Delete', action: 'delete' }],
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
      password: ''
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

