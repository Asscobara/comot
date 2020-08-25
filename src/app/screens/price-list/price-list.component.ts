import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { FormBaseClass } from 'src/app/controls/forms/formBaseClass';
import { IGridData } from 'src/app/controls/grid/grid.component';
import { ButtonActions, AbsScreenComponent } from 'src/app/screens/abs-screen/abs-screen.component';
import { IPrice } from 'src/shceme/IScheme';
import { DataService } from 'src/app/services/data.service';
import { SessionServiceService } from 'src/app/services/session-service.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeviceDetectorService } from 'ngx-device-detector';
import { PriceComponent } from 'src/app/forms/price/price.component';
import { InterfaceBase, IPriceHelper } from 'src/shceme/shcemeHelper';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent extends AbsScreenComponent<IPrice> {

  public gridData: IGridData;

  constructor (
    @Inject(MAT_DIALOG_DATA) private injectedData: any,
    private dataSrv: DataService, 
    sessionSrv: SessionServiceService,    
    changeDetect: ChangeDetectorRef, 
    dialogSrv: MatDialog, 
    changeDetector: ChangeDetectorRef,
    deviceDetectorService: DeviceDetectorService) {
    super(dialogSrv, changeDetect, PriceComponent, sessionSrv, changeDetector, deviceDetectorService); 
  }

  protected buildGridData() {
    this.gridData = {
      title: $localize`Price List`,
      columns: [
        {displayName: '#', fieldName: 'id'},
        {displayName: $localize`Description`, fieldName: 'name' },
        {displayName: $localize`Price`, fieldName: 'price' }
      ],
      rows: [],
      buttons: [
        { title: $localize`New`, action: ButtonActions.new, icon: 'add_circle_outline' }, 
        { title: $localize`Delete`, action: ButtonActions.delete, icon: 'remove_circle_outline' }
      ],
      canEditData: true
    }
  
    this.data.forEach( (price: IPrice) => this.gridData.rows.push(price));  
  }

  protected getEmptyT(): IPrice {
    const emptyPrice = InterfaceBase.getEmptyT(new IPriceHelper());
    emptyPrice.supplier_id = this.injectedData.instanceContext;
    return emptyPrice;
  }

  protected async loadData() {
    if (this.injectedData.instanceContext) {
      return this.dataSrv.getSuplierPriceList(this.injectedData.instanceContext.id); // USER ID?????
    }    
  }

  protected update(data: IPrice) {
    return this.dataSrv.updateSuplierPrice(data);
  }

  protected create(data: IPrice) {
    return this.dataSrv.createSuplierPrice(data);
  }

  protected delete(id: number) {
    return this.dataSrv.deleteSuplierPrice(id);
  }
}
