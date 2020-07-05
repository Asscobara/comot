import { Component, OnInit } from '@angular/core';
import { ITransaction, IUser } from 'src/shceme/IScheme';
import { FormBaseClass } from 'src/app/controls/forms/formBaseClass';
import { IOption } from 'src/app/controls/forms/inputs/field/field.component';
import { SessionServiceService } from 'src/app/services/session-service.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent  extends FormBaseClass<ITransaction> implements OnInit {

  public options: IOption[];
  public usersOptions: IOption[];

  constructor(private sessionSrv: SessionServiceService) { 
    super();
  }

  ngOnInit(): void {
    this.options = [];
    this.usersOptions = [];
    Object.keys(this.sessionSrv.transactions).forEach(t => {
      this.options.push({ value: t, displayValue: this.sessionSrv.transactions[t].displayName});
    });

    this.sessionSrv.users.forEach( (user: IUser) => {
      this.usersOptions.push({ value: user.id, displayValue: `${user.first_name} ${user.last_name}`})
    })
  }

}
