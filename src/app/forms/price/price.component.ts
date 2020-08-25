import { Component, OnInit } from '@angular/core';
import { FormBaseClass } from 'src/app/controls/forms/formBaseClass';
import { IPrice } from 'src/shceme/IScheme';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent extends FormBaseClass<IPrice>  implements OnInit {

  constructor() { 
    super(); 
  }

  ngOnInit(): void {
    
  }

}
