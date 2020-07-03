import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ValidatorFn, FormControl, NgModel, Validators } from '@angular/forms';
import { ValidatorNames, CustomValidators } from 'src/app/validators/validators';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit, IFieldComponent  {
  
  @Input() public title: string;
  @Input() public placeholder: string;
  @Input() public value: any;
  @Input() public control: FormControl;
  @Input() public hint: string;
  @Input() public type: string = 'text';
  @Input() public disabled: boolean;
  
  @Output()
  public valueChange = new EventEmitter();

  constructor() { }
  
  
  public get errorMassage(): string {
      if (this.hasError) {
        return CustomValidators.getErrorString(this.control);        
      }
      return '';
  }

  public get isRequried(): boolean{
    if (!this.control || !this.control.validator) {
      return false;
    }

    return CustomValidators.hasRequiredField(this.control);
  }

  public get hasError(): boolean {
    if(!this.control) {
      return false;
    }
    return this.control.dirty && this.control.invalid;
  }

  ngOnInit(): void {
    if (!this.control) {
      this.control = new FormControl();
    }
    this.control.setValue(this.value);    
    this.control.valueChanges.subscribe(v => {
      this.value = v;
      this.valueChange.emit(this.value);
    });
  }

}

export interface IFieldComponent {
  control: FormControl;
}
