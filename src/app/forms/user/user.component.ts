import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/shceme/IScheme';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { FormBaseClass } from '../../controls/forms/formBaseClass';
import { ValidatorNames } from 'src/app/validators/validators';
import { SessionServiceService } from 'src/app/services/session-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/controls/dialog/dialog.component';
import { PasswordComponent } from '../password/password.component';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends FormBaseClass<IUser> implements OnInit {

  public emailControl: FormControl = new FormControl(); 
  constructor(
    private dialogSrv: MatDialog, 
    private dataSrv: DataService,
    public sessionSrv: SessionServiceService) { 
    super();
    this.emailControl.setValidators([Validators.required, Validators.email]);
  }

  ngOnInit(): void {
    this.formGroup.addControl(ValidatorNames.required, this.emailControl);
  }

  updatePassword() {
    this.dialogSrv.open(DialogComponent, {
      "minWidth": 250,
      "data": { 
        content: PasswordComponent, 
        instanceContext: this.context, 
        title: $localize`Update Password`
      }
    }).afterClosed().subscribe( async (d: IUser) =>  {     
      if (d) {
        try {
          const u = await this.dataSrv.updatePassword(d);
          // TODO: Show message
        } catch(err) {
          // d= err.statusText;          
          // this.openLoginDialog(d);
        }
      }
    });
  }
}
