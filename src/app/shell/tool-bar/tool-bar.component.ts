import { Component, OnInit } from '@angular/core';
import { LoginComponent } from 'src/app/forms/login/login.component';
import { DialogComponent } from 'src/app/controls/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ILogin } from 'src/shceme/IScheme';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {

  constructor(private dialogSrv: MatDialog) { 
    
  }

  ngOnInit(): void {
  }
  public login() {
    
      this.dialogSrv.open(DialogComponent, {
          "minWidth": 250,
          "data": { 
            content: LoginComponent, 
            instanceContext: {user_name: '', password: ''}, 
            title: $localize`Login`
          }
        }).afterClosed().subscribe( async (d: ILogin) =>  {     
          if (d) {
            console.log(JSON.stringify(d));
          }
  
        });
    }
  
}
