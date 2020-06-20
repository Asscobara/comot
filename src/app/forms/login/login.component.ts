import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormBaseClass } from 'src/app/controls/forms/formBaseClass';
import { ValidatorNames } from 'src/app/validators/validators';
import { ILogin } from 'src/shceme/IScheme';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends FormBaseClass<ILogin> implements OnInit {

  public passwordControl: FormControl = new FormControl(); 
  public userNameControl: FormControl = new FormControl();

  constructor() { 
    super();
    this.userNameControl.setValidators([Validators.required]);
    this.passwordControl.setValidators([Validators.required]);
  }

  ngOnInit(): void {
    this.formGroup.addControl(`${ValidatorNames.required}_1`, this.userNameControl);
    this.formGroup.addControl(`${ValidatorNames.required}_2`, this.passwordControl);
  }

}
