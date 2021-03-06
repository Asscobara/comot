import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormBaseClass } from 'src/app/controls/forms/formBaseClass';
import { ValidatorNames, CustomValidators } from 'src/app/validators/validators';
import { ILogin, IUser } from 'src/shceme/IScheme';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { UserComponent } from '../user/user.component';
import { DialogComponent } from 'src/app/controls/dialog/dialog.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends FormBaseClass<ILogin> implements OnInit {

  public passwordControl: FormControl = new FormControl(); 
  public userNameControl: FormControl = new FormControl();

  constructor(private dialogSrv: MatDialog, private dataSrv: DataService) { 
    super();
    this.userNameControl.setValidators([Validators.required]);
    this.passwordControl.setValidators([CustomValidators.passwordValidator, Validators.required]);
  }

  ngOnInit(): void {
    this.formGroup.addControl(`${ValidatorNames.required}_1`, this.userNameControl);
    this.formGroup.addControl(`${ValidatorNames.required}_2`, this.passwordControl);
  }

  forgotPassword() {
    // TODO: send new email woth temp password
  }
  
  openRegisterDialog() {
    
    this.context.user.role_id = 2;

    this.dialogSrv.open(DialogComponent, {
      "minWidth": 250,
      "data": { 
        content: RegisterComponent, 
        instanceContext: this.context.user, 
        title: $localize`Register`
      }
    }).afterClosed().subscribe( async (d: IUser) =>  {     
      if (d) {
        try {
          const u = await this.dataSrv.register(d);
          // TODO: Show message
        } catch(err) {
          // d= err.statusText;          
          // this.openLoginDialog(d);
        }
      }
    });
  }
}
