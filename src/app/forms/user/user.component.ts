import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  @ViewChild("userDialogTemplate")
  public static userDialogTemplate: TemplateRef<any>;

  constructor(@Inject(MAT_DIALOG_DATA) public context: any) { 
    debugger;
  }

  ngOnInit(): void {
    debugger;
  }

}
