import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomValidators } from 'src/app/validators/validators';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css'],
  providers: [
    { provide: MatFormFieldControl, useExisting: FieldComponent }   
  ]
})
export class FieldComponent implements OnInit, OnDestroy, IFieldComponent  {
  
  @Input() public title: string;
  @Input() public placeholder: string;
  @Input() public value: any;
  @Input() public control: FormControl;
  @Input() public hint: string;
  @Input() public type: string = 'text';
  @Input() public disabled: boolean;
  @Input() public options: IOption[];
  @Input() public multiple: boolean;

  @Output()
  public valueChange = new EventEmitter();

  private valueListener: Subscription;

  constructor() { }
  
  public get errorMassage(): string {
      if (this.hasError) {
        return CustomValidators.getErrorString(this.control);        
      }
      return '';
  }

  public checked: boolean;

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
    this.valueListener = this.control.valueChanges.subscribe(v => {
      this.value = v;
      this.valueChange.emit(this.value);
    });
  }

  ngOnDestroy(): void {
    if (this.valueListener) {
      this.valueListener.unsubscribe();
    }
  }

}

export interface IFieldComponent {
  control: FormControl;
}

export interface IOption {
  value: any;
  displayValue: string;
}