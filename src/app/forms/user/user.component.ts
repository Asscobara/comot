import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser } from 'src/shceme/IScheme';
import { Validators } from '@angular/forms';
import { formBaseClass } from '../../controls/forms/formBaseClass';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends formBaseClass<IUser> implements OnInit {

  constructor() { 
    super();
  }

  ngOnInit(): void {
    
  }

}
