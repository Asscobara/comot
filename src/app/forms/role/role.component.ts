import { Component, OnInit } from '@angular/core';
import { FormBaseClass } from 'src/app/controls/forms/formBaseClass';
import { IUser } from 'src/shceme/IScheme';
import { SessionServiceService } from 'src/app/services/session-service.service';
import { IOption } from 'src/app/controls/forms/inputs/field/field.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent extends FormBaseClass<IUser> implements OnInit {

  public roleOptions: IOption[];
  constructor(private sessionSrv: SessionServiceService) { 
    super();
  }

  ngOnInit(): void {
    this.roleOptions = [];

    Object.keys(this.sessionSrv.roles).forEach(t => {
      this.roleOptions.push({ value: this.sessionSrv.roles[t].dbId , displayValue: this.sessionSrv.roles[t].displayName});
    });
  }

}
