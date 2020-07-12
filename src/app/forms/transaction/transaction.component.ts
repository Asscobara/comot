import { Component, OnInit } from '@angular/core';
import { ITransaction, IUser } from 'src/shceme/IScheme';
import { FormBaseClass } from 'src/app/controls/forms/formBaseClass';
import { IOption } from 'src/app/controls/forms/inputs/field/field.component';
import { SessionServiceService } from 'src/app/services/session-service.service';
import { Format } from 'src/app/utils/format';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent extends FormBaseClass<ITransaction> implements OnInit {

  public transactionsOptions: IOption[];
  public usersOptions: IOption[];

  constructor(private sessionSrv: SessionServiceService) { 
    super();
  }

  public get date_time(): string {
    return Format.formatDate(new Date(this.context.date_time));
  }

  public set date_time(value: string) {
    this.context.date_time = new Date(value);
  }

  ngOnInit(): void {
    this.transactionsOptions = [];
    this.usersOptions = [];
    Object.keys(this.sessionSrv.transactions).forEach(t => {
      this.transactionsOptions.push({ value: this.sessionSrv.transactions[t].dbId , displayValue: this.sessionSrv.transactions[t].displayName});
    });

    this.sessionSrv.users.forEach( (user: IUser) => {
      this.usersOptions.push({ value: user.id, displayValue: `${user.first_name} ${user.last_name}`})
    })
  }

}
