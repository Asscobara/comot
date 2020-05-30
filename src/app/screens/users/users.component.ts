import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { UserComponent } from 'src/app/forms/user/user.component';
import { DialogComponent } from 'src/app/controls/dialog/dialog.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any = [];
  @ViewChild("userDialogTemplate")
  public userDialogTemplate: TemplateRef<any>;
  
  constructor(private dataSrv: DataService, private dialogSrv: MatDialog) {
    
  }

  async ngOnInit() {
     (await this.dataSrv.getUsers()).subscribe(d => this.users = d); 
  }

  public openUser(user: any) {
    this.dialogSrv.open(DialogComponent, {"data": { content: UserComponent, instanceContext: user }});
  }

}
