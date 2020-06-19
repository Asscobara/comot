
import { Validators, FormGroup } from '@angular/forms';

export class FormBaseClass<T> {
    public context: T;
    public formGroup: FormGroup;

    constructor() { 
        this.formGroup = new FormGroup({});    
    }
}