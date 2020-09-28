import { AbstractControl, ValidatorFn } from '@angular/forms';
import { isNumber } from 'util';

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
                case ValidatorNames.required:           return $localize`Missing required field`;
                case ValidatorNames.email:              return $localize`Email field incorrect`;
                case ValidatorNames.matchWith:          return $localize`Value does not match`;
                case ValidatorNames.password:           return $localize`Password does match rules`;
                case ValidatorNames.dayInMonth:         return $localize`Value must be between 1 and 31`;
                case ValidatorNames.range:              return $localize`Value is not in range`;
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

    public static dayInMonthValidator() : ValidatorFn {
        return (control: AbstractControl): ICustomValidatorError | null => {
            if (!isNumber(control.value) || control.value < 0 && control.value > 31) {
                return {[ValidatorNames.dayInMonth]: true};
            } else {
                debugger;
                return null;    
            }
        };
    }
}


export interface ICustomValidatorError {
    [key: string]: boolean;
}

export enum ValidatorNames {
    required = 'reqired',
    email = 'email',
    matchWith = 'matchWith',
    password = 'password',
    dayInMonth = 'dayInMonth',
    range = 'range'
}
