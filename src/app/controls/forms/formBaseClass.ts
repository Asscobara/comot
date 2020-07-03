
import { FormGroup } from '@angular/forms';

export class FormBaseClass<T> {
    public context: T;
    public formGroup: FormGroup;

    public disabled: boolean;
    
    constructor() { 
        this.formGroup = new FormGroup({});    
    }
}