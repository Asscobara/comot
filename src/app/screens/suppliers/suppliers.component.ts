import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ISupplier, IUser } from 'src/shceme/IScheme';
import { SupplierComponent } from 'src/app/forms/supplier/supplier.component';
import { AbsScreenComponent, ButtonActions } from '../abs-screen/abs-screen.component';
import { DataService } from 'src/app/services/data.service';
import { SessionServiceService } from 'src/app/services/session-service.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-suppliers',
  templateUrl: './../abs-screen/abs-screen.component.html',
  styleUrls: ['./../abs-screen/abs-screen.component.css', './../abs-screen/abs-screen.component.css']
})
export class SuppliersComponent extends AbsScreenComponent<ISupplier> {
  
  constructor (
    private dataSrv: DataService, 
    sessionSrv: SessionServiceService,    
    changeDetect: ChangeDetectorRef, 
    dialogSrv: MatDialog, 
    changeDetector: ChangeDetectorRef) {
    super(dialogSrv, changeDetect, SupplierComponent, sessionSrv, changeDetector); 
  }

  protected buildGridData() {
    this.gridData = {
      title: $localize`Suppliers`,
      columns: [
        {displayName: '#', fieldName: 'id'},
        {displayName: $localize`First Name`, fieldName: 'first_name' },
        {displayName: $localize`Last Name`, fieldName: 'last_name' },
        {displayName: $localize`Phone`, fieldName: 'phone' },
        {displayName: $localize`Email`, fieldName: 'email' },
        {displayName: $localize`Category`, fieldName: 'category_id', fieldNameSource: (categoryId) => this.sessionSrv.categories[categoryId].displayName }],
      rows: [],
      buttons: [
        { title: $localize`New`, action: ButtonActions.new, icon: 'add_circle_outline' }, 
        { title: $localize`Delete`, action: ButtonActions.delete, icon: 'remove_circle_outline' }
      ],
      canEditData: this.sessionSrv.user?.role_id == 2
    }

    this.data.forEach( (supplier: ISupplier) => {
      this.gridData.rows.push({ 
        ...supplier, 
        first_name: supplier.user_id.first_name, 
        last_name: supplier.user_id.last_name, 
        phone: supplier.user_id.phone,
        email: supplier.user_id.email});
    });
  }


  protected getEmptyT(): ISupplier {
    return {
      id: 0,
      category_id: 0,
      sub_categories_id: '',
      remark: '',
      user_id: {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        id: 0,
        is_logged_in: false,
        password: '',
        role_id: 5,
        remark: '',
        address_id: this.sessionSrv.address.id,
        apartment_number: 0,
        floor_number: 0,
        registered: false
      }
    }
  }

  protected async loadData() {
    if (this.sessionSrv.address) {
      return this.dataSrv.getSuppliers(this.sessionSrv.address.id); // USER ID?????
    }    
  }

  protected update(data: ISupplier) {
    return this.dataSrv.updateSupplier(data);
  }

  protected create(data: ISupplier) {
    return this.dataSrv.createSupplier(data);
  }

  protected delete(id: number) {
    return this.dataSrv.deleteSupplier(id);
  }
}