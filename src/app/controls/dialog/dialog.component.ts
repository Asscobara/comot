import { Component, inject, TemplateRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  
   constructor(@inject(MAT_DIALOG_DATA) public data: any) { 
    //
    //this.template = this.data.template;
   // (this.template as any).data = this.data.data;
   // this.orgData = JSON.parse(JSON.stringify(this.data.data));
   }

  public orgData: any;
 // public data: any;
  public template: TemplateRef<any>;

}
