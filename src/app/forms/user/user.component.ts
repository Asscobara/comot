import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public context: any
  
  constructor() { 
    
  }

  ngOnInit(): void {
    
  }

}
