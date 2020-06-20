import { Component, OnInit } from '@angular/core';
import { LoginComponent } from 'src/app/forms/login/login.component';
import { DialogComponent } from 'src/app/controls/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { IUser } from 'src/shceme/IScheme';
import { UserComponent } from 'src/app/forms/user/user.component';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {

  constructor(private dialogSrv: MatDialog, private dataSrv: DataService) { 
    
  }

  ngOnInit(): void {
  }

  public register() {
    this.dialogSrv.open(DialogComponent, {
      "minWidth": 250,
      "data": { 
        content: UserComponent, 
        instanceContext: {id: 0, first_name: '', last_name: '', email: '', password: '', is_logged_in: false}, 
        title: $localize`Register`
      }
    }).afterClosed().subscribe( async (d: IUser) =>  {     
      if (d) {
        const u = await this.dataSrv.register(d);
        debugger;
        console.log(JSON.stringify(u));
      }
    });
  }

  public login() {
    
      this.dialogSrv.open(DialogComponent, {
          "minWidth": 250,
          "data": { 
            content: LoginComponent, 
            instanceContext: {id: 0, first_name: '1', last_name: '1', email: '', password: '', is_logged_in: false}, 
            title: $localize`Login`
          }
        }).afterClosed().subscribe( async (d: IUser) =>  {     
          if (d) {
            const u = await this.dataSrv.login(d);
            debugger;
            console.log(JSON.stringify(d));
          }
        });
    }
  
}
