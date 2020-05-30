import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { UserComponent } from 'src/app/forms/user/user.component';
import { DialogComponent } from 'src/app/controls/dialog/dialog.component';
import { DialogFactoryService } from 'src/app/services/dialog-factory.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any = [];
  @ViewChild("userDialogTemplate")
  public userDialogTemplate: TemplateRef<any>;
  
  constructor(private dataSrv: DataService, private dialogSrv: MatDialog, private dialogFactoryService: DialogFactoryService) {
    
  }

  async ngOnInit() {
     (await this.dataSrv.getUsers()).subscribe(d => this.users = d); 
  }

  public openUser(user: any) {
    this.dialogFactoryService.open( { 
      headerText: 'Header text',
      template: this.userDialogTemplate, 
      context: user.firstName } );
  }

}
