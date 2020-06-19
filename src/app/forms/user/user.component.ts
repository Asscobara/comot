import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/shceme/IScheme';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { FormBaseClass } from '../../controls/forms/formBaseClass';
import { ValidatorNames } from 'src/app/validators/validators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends FormBaseClass<IUser> implements OnInit {

  public emailControl: FormControl = new FormControl(); 
  constructor() { 
    super();
    this.emailControl.setValidators([Validators.required, Validators.email]);
  }

  ngOnInit(): void {
    this.formGroup.addControl(ValidatorNames.required, this.emailControl);
  }

}
