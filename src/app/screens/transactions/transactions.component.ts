import { Component, ChangeDetectorRef } from '@angular/core';
import { ITransaction } from 'src/shceme/IScheme';
import { AbsScreenComponent, ButtonActions } from '../abs-screen/abs-screen.component';
import { DataService } from 'src/app/services/data.service';
import { SessionServiceService } from 'src/app/services/session-service.service';
import { MatDialog } from '@angular/material/dialog';
import { TransactionComponent } from 'src/app/forms/transaction/transaction.component';
import { Format } from 'src/app/utils/format';

@Component({
  selector: 'app-transactions',
  templateUrl: './../abs-screen/abs-screen.component.html',
  styleUrls: ['./../abs-screen/abs-screen.component.css', './../abs-screen/abs-screen.component.css']
})
export class TransactionsComponent extends AbsScreenComponent<ITransaction>  {

  constructor (
    private dataSrv: DataService, 
    sessionSrv: SessionServiceService,    
    changeDetect: ChangeDetectorRef, 
    dialogSrv: MatDialog, 
    changeDetector: ChangeDetectorRef) {
    super(dialogSrv, changeDetect, TransactionComponent, sessionSrv, changeDetector); 
  }

  protected buildGridData() {
    this.gridData = {
      title: $localize`Transactions`,
      columns: [
        {displayName: '#', fieldName: 'id'},
        {displayName: $localize`Amount`, fieldName: 'amount'},
        {displayName: $localize`Transaction Type`, fieldName: 'transaction_type', fieldNameSource: (transactionTypeId) => this.sessionSrv.transactions[transactionTypeId].displayName },
        {displayName: $localize`Date`, fieldName: 'date_time', fieldNameSource: (date) => Format.formatDate(new Date(date))},
        {displayName: $localize`Tenant's Name`, fieldName: 'user_id', fieldNameSource:  (userId) => {
          const user = this.sessionSrv.users.find(u => u.id == userId);
          if(user) {
            return `${user.first_name} ${user.last_name}`;
          }
          return $localize`Unkown`;
        }},
        {displayName: $localize`Remark`, fieldName: 'remark'}],
      rows: [],
      buttons: [
        { title: $localize`New`, action: ButtonActions.new, icon: 'add_circle_outline' }, 
        { title: $localize`Delete`, action: ButtonActions.delete, icon: 'remove_circle_outline' }
      ],
      canEditData: this.sessionSrv.user?.role_id == 2
    }

    this.data.forEach( (user: ITransaction) => {
      this.gridData.rows.push(user);
    });
  }


  protected getEmptyT(): ITransaction {
    return {
      id: 0,
      amount: 0,
      transaction_type: 0,
      date_time: Date.now(),
      user_id: 0,
      remark: '',
      send_recipt: false
    }
  }

  protected async loadData() {
    if (this.sessionSrv.address) {
      return this.dataSrv.getAddressTransaction(this.sessionSrv.address.id);
    }    
  }

  protected update(data: ITransaction) {
    return this.dataSrv.updateTransaction(data);
  }

  protected create(data: ITransaction) {
    return this.dataSrv.createTransaction(data);
  }

  protected delete(id: number) {
    return  {}; // this.dataSrv.tra(id);
  }

}
