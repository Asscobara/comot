import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ValidatorFn, FormControl, NgModel } from '@angular/forms';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnChanges, OnInit  {
  
  @Input() public title: string;
  @Input() public placeholder: string;
  @Input() public validators: ValidatorFn[];
  @Input() public value: any;

  @Output()
  public valueChange = new EventEmitter();

  public formControl: FormControl;
  
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
  }
  
  ngOnInit(): void {
    this.formControl = new FormControl();
    this.formControl.setValidators(this.validators);
    this.formControl.setValue(this.value);    
    this.formControl.valueChanges.subscribe(v => {
      this.value = v;
      this.valueChange.emit(this.value);
    })
  }

}
