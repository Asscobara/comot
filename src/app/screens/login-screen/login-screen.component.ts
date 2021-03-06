import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { DialogComponent } from 'src/app/controls/dialog/dialog.component';
import { LoginComponent } from 'src/app/forms/login/login.component';
import { IUser, ILogin } from 'src/shceme/IScheme';
import { SessionServiceService } from 'src/app/services/session-service.service';
import { ServerErrors } from 'src/app/utils/ServerErrors';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {

  public loginUser: string;
  constructor (
    private dialogSrv: MatDialog, 
    private dataSrv: DataService, 
    private sessionSrv: SessionServiceService) { 

    }

  ngOnInit(): void {
    this.openLoginDialog(null);    
  }

  openLoginDialog(context: ILogin) {
    this.dialogSrv.open(DialogComponent, {
      disableClose: true,
      "minWidth": 250,
      "data": { 
        content: LoginComponent, 
        instanceContext: context ? context : { user: { id: 0, first_name: '1', last_name: '1', email: '', password: '', is_logged_in: false, address_id: null }, errors: null}, 
        title: $localize`Login`
      }
    }).afterClosed().subscribe( async (d: ILogin) =>  {     
      if (d) {
        try {
          const u = await this.dataSrv.login(d.user);
          this.sessionSrv.user = (u as any)?.data;
        } catch(err) {
          d.errors = ServerErrors.errors[err.error.code] ? ServerErrors.errors[err.error.code] : err.statusText;          
          this.openLoginDialog(d);
        }
      }
    });
  }

}


  
