import { Component, OnInit } from '@angular/core';
import { IAddress } from 'src/shceme/IScheme';
import { FormBaseClass } from 'src/app/controls/forms/formBaseClass';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent extends FormBaseClass<IAddress> implements OnInit {

  constructor() {
    super();
   }

  ngOnInit(): void {
  }

}
