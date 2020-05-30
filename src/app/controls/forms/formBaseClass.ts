
import { Validators, FormGroup } from '@angular/forms';

export class formBaseClass<T> {

    public required = [Validators.required];

    public context: T;
    public formGroup: FormGroup;

}