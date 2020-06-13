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

  constructor(private dataSrv: DataService, private dialogSrv: MatDialog) {
    
  }

  async ngOnInit() {
     (await this.dataSrv.getUsers()).subscribe( (d: any) => { 
       this.users = d.data;
       this.buildGridData();
     }); 
  }

  public buildGridData() {
    this.gridData = {
      columns: ['#', 'First Name', 'Last Name', 'Email'],
      rows: []
    }

    this.users.forEach( (user: IUser) => {
      let row = {data: []}
      row.data = [];
      row.data.push(user.id, user.first_name, user.last_name, user.email);
      this.gridData.rows.push(row);
    });
  }

  public onRowSelected($event) {
    const user: IUser = {
      id: $event.data[0],
      first_name: $event.data[1],
      last_name: $event.data[2],
      email: $event.data[3],
      password: ''
    }
    this._openUser(user);
  }

  private _openUser(user: IUser) {
    this.dialogSrv.open(DialogComponent, {"data": { content: UserComponent, instanceContext: user }}).afterClosed().subscribe(d => {
      user.password = "12345678";
      // this.dataSrv.deleteUser(user.id);
      this.dataSrv.updateUser(user);
    });
  }

}
