import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { UserComponent } from 'src/app/forms/user/user.component';
import { DialogComponent } from 'src/app/controls/dialog/dialog.component';
import { IUser } from 'src/shceme/IScheme';
import { IGridData } from 'src/app/controls/grid/grid.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: IUser[];
  gridData: IGridData;

  viewState: ViewState = ViewState.view;

  constructor(private dataSrv: DataService, private dialogSrv: MatDialog) {
    
  }

  async ngOnInit() {
    await this.loadData();
  }

  public buildGridData() {
    this.gridData = {
      columns: ['#', 'First Name', 'Last Name', 'Email'],
      rows: [],
      buttons: [{ title: 'New', action: 'new' }, { title: 'Delete', action: 'delete' }],
      canSelectItem: true
    }

    this.users.forEach( (user: IUser) => {
      let row = {data: []}
      row.data = [];
      row.data.push(user.id, user.first_name, user.last_name, user.email);
      this.gridData.rows.push(row);
    });
  }

  public onButtonClicked($event) {
    switch($event.action) {
      case 'new':
        this.viewState = ViewState.new;
        this._openUser({
          id: 0,
          first_name: '',
          last_name: '',
          email: '',
          password: ''
        });
        break;
      case 'delete':
        //this.viewState = ViewState.new;
        //this.handleViewState()
        break;
    }
  }

  public onRowSelected($event) {
    
    this.viewState = ViewState.edit;

    const user: IUser = {
      id: $event.data[0],
      first_name: $event.data[1],
      last_name: $event.data[2],
      email: $event.data[3],
      password: '12345678'
    }
    this._openUser(user);
  }

  private _openUser(user: IUser) {
    this.dialogSrv.open(DialogComponent, {"data": { content: UserComponent, instanceContext: user }}).afterClosed().subscribe( async (d) =>  {     
      await this.handleViewState(user);
      await this.loadData();
    });
  }

  private async loadData() {
    this.viewState = ViewState.loading;
    (await this.dataSrv.getUsers()).subscribe( (d: any) => { 
      this.users = d.data;
      this.buildGridData();
      this.viewState = ViewState.view;
    }); 
  }

  private async handleViewState(user: IUser) {
    switch(this.viewState) {
      case ViewState.edit:
        this.viewState = ViewState.updating;
        await this.dataSrv.updateUser(user);
        this.viewState = ViewState.view;
        break;
      case ViewState.new:
        this.viewState = ViewState.updating;
        await this.dataSrv.createUser(user);          
        this.viewState = ViewState.view;
        break;
      case ViewState.delete:
        this.viewState = ViewState.deleting;
        await this.dataSrv.deleteUser(user.id);          
        this.viewState = ViewState.view;
    }
  }
}

export enum ViewState {
  edit,
  view,
  new,
  delete,
  loading,
  updating,
  deleting
}
