import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ISupplier, IUser } from 'src/shceme/IScheme';
import { SupplierComponent } from 'src/app/forms/supplier/supplier.component';
import { AbsScreenComponent } from '../abs-screen/abs-screen.component';
import { DataService } from 'src/app/services/data.service';
import { SessionServiceService } from 'src/app/services/session-service.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent extends AbsScreenComponent<ISupplier> implements OnInit {
  
  constructor (
    private dataSrv: DataService, 
    sessionSrv: SessionServiceService,    
    changeDetect: ChangeDetectorRef, 
    dialogSrv: MatDialog) {
    super(dialogSrv, changeDetect, SupplierComponent, sessionSrv); 
  }


  async ngOnInit() {
  }

  protected buildGridData() {
    this.gridData = {
      columns: [
        {displayName: '#', fieldName: 'id'},
        {displayName: $localize`Name`, fieldName: 'user_id', fieldNameSource: (user: IUser) => `${user.first_name} ${user.last_name}` },
        {displayName: $localize`Phone`, fieldName: 'user_id', fieldNameSource: (user: IUser) => `${user.phone}` },
        {displayName: $localize`Email`, fieldName: 'user_id', fieldNameSource: (user: IUser) => `${user.email}` },
        {displayName: $localize`Category`, fieldName: 'category_id', fieldNameSource: (categoryId) => this.sessionSrv.categories[categoryId].name }],
      rows: [],
      buttons: [
        { title: $localize`New`, action: 'new', icon: 'add_circle_outline' }, 
        { title: $localize`Delete`, action: 'delete', icon: 'remove_circle_outline' }
      ],
      canEditData: this.sessionSrv.user?.role_id == 2
    }

    this.data.forEach( (supplier: ISupplier) => {
      this.gridData.rows.push(supplier);
    });
  }


  protected getEmptyT(): ISupplier {
    return {
      id: 0,
      category_id: 0,
      sub_categories_id: [],
      remark: '',
      user_id: null
    }
  }

  protected async loadData() {
    if (this.sessionSrv.address) {
      return this.dataSrv.getAddressTransaction(this.sessionSrv.address.id);
    }    
  }

  protected update(data: ISupplier) {
    return null; // this.dataSrv.updateTransaction(data);
  }

  protected create(data: ISupplier) {
    // data.user_id = this.sessionSrv.user.id; // TODO: 
    return null; // this.dataSrv.createTransaction(data);
  }

  protected delete(id: number) {
    return  {}; // this.dataSrv.tra(id);
  }
}
