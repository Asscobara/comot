import { Component } from '@angular/core';
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

  constructor(private dataSrv: DataService, dialogSrv: MatDialog) {
    super(dialogSrv, UserComponent); 
  }

  protected getFilledT(data: any): IUser {
    return {
      id: data[0],
      first_name: data[1],
      last_name: data[2],
      email: data[3],
      password: '11111'
    };
  }

  protected buildGridData() {
    this.gridData = {
      columns: ['#', 'First Name', 'Last Name', 'Email'],
      rows: [],
      buttons: [{ title: 'New', action: 'new' }, { title: 'Delete', action: 'delete' }],
      canSelectItem: true
    }

    this.data.forEach( (user: IUser) => {
      let row = {data: [], selected: false}

      row.data = [];
      row.data.push(user.id, user.first_name, user.last_name, user.email);
      this.gridData.rows.push(row);
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

  protected async loadData(postload: () => void) {
    return (await this.dataSrv.getUsers()).subscribe((d: any) => {
      this.data = d.data;
      postload();
    });
  }

  protected update(data: IUser) {
    return this.dataSrv.updateUser(data);
  }

  protected create(data: IUser) {
    return this.dataSrv.updateUser(data);
  }

  protected delete(id: number) {
    return this.dataSrv.deleteUser(id);
  }

}

