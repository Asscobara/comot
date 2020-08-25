import { Component, OnInit } from '@angular/core';
import { FormBaseClass } from 'src/app/controls/forms/formBaseClass';
import { IOption } from 'src/app/controls/forms/inputs/field/field.component';
import { SessionServiceService } from 'src/app/services/session-service.service';
import { FormControl, Validators } from '@angular/forms';
import { ValidatorNames } from 'src/app/validators/validators';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { DialogComponent } from 'src/app/controls/dialog/dialog.component';
import { PriceListComponent } from 'src/app/screens/price-list/price-list.component';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent extends FormBaseClass<any> implements OnInit {

  public categoriesOptions: IOption[];
  public emailControl: FormControl = new FormControl(); 

  constructor(
    private dialogSrv: MatDialog, 
    private dataSrv: DataService, 
    private sessionSrv: SessionServiceService) { 
      super();
      this.emailControl.setValidators([Validators.required, Validators.email]);
  }

  ngOnInit(): void {
    this.categoriesOptions = [];
    
    Object.keys(this.sessionSrv.categories).forEach(t => {
      this.categoriesOptions.push({ value: this.sessionSrv.categories[t].dbId , displayValue: this.sessionSrv.categories[t].displayName});
    });
    this.formGroup.addControl(ValidatorNames.required, this.emailControl);
  }

  openPriceList() {

    this.dialogSrv.open(DialogComponent, {
      "minWidth": 250,
      "data": { 
        content: PriceListComponent, 
        instanceContext: this.context, 
        title: $localize`Price List`
      }
    }).afterClosed().subscribe( async (d: any) =>  {     
      if (d) {
        try {
            // const u = await this.dataSrv.register(d);
           // TODO: Show message
          } catch(err) {
          // d= err.statusText;          
          // this.openLoginDialog(d);
          }
        }
      });
    }
  
}
