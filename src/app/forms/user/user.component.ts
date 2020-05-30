import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser } from 'src/shceme/IScheme';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public required = [Validators.required];

  public context: IUser;

  public setValue(target, value) {
    this.context[target] = value;
  }
  
  constructor() { 
    
  }

  ngOnInit(): void {
    
  }

}
