import { AbstractControl } from '@angular/forms';

export  class CustomValidators {

    public static getErrorString(abstractControl: AbstractControl): string {

        const getError = (ctrl: AbstractControl) => {
            if (!ctrl.errors) {
                return ``;
            }
            let errorKey = '';
            Object.keys(ctrl.errors).forEach(key => {
                errorKey = key;
            });
            switch( errorKey) {
                case 'required': return `Missing required field`;
                case 'email': return `Email field incorrect`;
            }
            return ``;
        }

        if (abstractControl.validator) {
            return getError(abstractControl);
        }
        if (abstractControl['controls']) {
            for (const controlName in abstractControl['controls']) {
                if (abstractControl['controls'][controlName]) {
                    if (abstractControl['controls'][controlName].status === "INVALID") {
                        return getError(abstractControl['controls'][controlName]);
                    }
                }
            }
        }
        return ``;
    }

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
