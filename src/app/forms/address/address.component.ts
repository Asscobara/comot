import { Component, OnInit } from '@angular/core';
import { IAddress } from 'src/shceme/IScheme';
import { FormBaseClass } from 'src/app/controls/forms/formBaseClass';
import { CustomValidators, ValidatorNames } from 'src/app/validators/validators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent extends FormBaseClass<IAddress> implements OnInit {

  public dayInMotnControl: FormControl = new FormControl();;
  constructor() {    
    super();
    this.dayInMotnControl.setValidators([CustomValidators.dayInMonthValidator]);
   }

  ngOnInit(): void {
    this.formGroup.addControl(ValidatorNames.dayInMonth, this.dayInMotnControl);
  }

}
