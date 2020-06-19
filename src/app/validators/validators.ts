import { AbstractControl } from '@angular/forms';

export  class CustomValidators {

    public static hasRequiredField(abstractControl: AbstractControl): boolean {
        if (abstractControl.validator) {
            const validator = abstractControl.validator({}as AbstractControl);
            if (validator && validator.required) {
                return true;
            }
        }
        if (abstractControl['controls']) {
            for (const controlName in abstractControl['controls']) {
                if (abstractControl['controls'][controlName]) {
                    if (this.hasRequiredField(abstractControl['controls'][controlName])) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
}

export enum ValidatorNames {
    required = 'reqired'
}
