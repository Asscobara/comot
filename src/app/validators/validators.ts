import { AbstractControl, ValidatorFn } from '@angular/forms';

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
            switch(errorKey) {
                case 'required': return $localize`Missing required field`;
                case 'email': return $localize`Email field incorrect`;
                case 'matchWith': return $localize`Value does not match`;
                case 'password': return $localize`Password does match rules`;
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

    public static textMatchValidator(matchWith: AbstractControl) : ValidatorFn {
        return (control: AbstractControl): ICustomValidatorError | null => {
            return control.value != matchWith.value ? {[ValidatorNames.matchWith]: true} : null;
        };
    }

    public static passwordValidator() : ValidatorFn {
        return (control: AbstractControl): ICustomValidatorError | null => {
            return !control.value || control.value == '' ? {[ValidatorNames.password]: true} : null;
        };
    }
}


export interface ICustomValidatorError {
    [key: string]: boolean;
}

export enum ValidatorNames {
    required = 'reqired',
    matchWith = 'matchWith',
    password = 'password'
}
