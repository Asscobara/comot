import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBaseClass } from 'src/app/controls/forms/formBaseClass';
import { ITask } from 'src/shceme/IScheme';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { SessionServiceService } from 'src/app/services/session-service.service';
import { IOption } from 'src/app/controls/forms/inputs/field/field.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent extends FormBaseClass<ITask> implements OnInit, OnChanges {
  
  public categoriesOptions: IOption[];
  public taskStatusesOptions: IOption[];
  public suplierOptions: IOption[]; 

  constructor(private sessionSrv: SessionServiceService) { 
      super();
  }

  ngOnChanges(changes) {
    console.log(JSON.stringify(changes));
  }

  ngOnInit(): void {
    this.categoriesOptions = [];
    this.taskStatusesOptions = [];

    Object.keys(this.sessionSrv.categories).forEach(t => {
      this.categoriesOptions.push({ value: this.sessionSrv.categories[t].dbId , displayValue: this.sessionSrv.categories[t].displayName});
    });

    Object.keys(this.sessionSrv.taskStatuses).forEach(t => {
      this.taskStatusesOptions.push({ value: this.sessionSrv.taskStatuses[t].dbId , displayValue: this.sessionSrv.taskStatuses[t].displayName});
    });

    this.updateSuppliers();
  }

  public onCategoryChange($evet) {
    this.updateSuppliers();
  }

  private updateSuppliers() {
    
    this.suplierOptions = [];
    
    const supliers = this.sessionSrv.supliers;
    supliers.forEach(suplier => {     
      if (this.context.category_id == 0 || suplier.category_id == this.context.category_id) {
        this.suplierOptions.push( {value: suplier.id, displayValue: `${suplier.user_id.first_name} ${suplier.user_id.last_name}`} );
      }       
    });
  }

}
