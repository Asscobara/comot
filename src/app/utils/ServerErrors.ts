
export class ServerErrors {

    public static readonly errors = {
        [101]: $localize`Email already exists`,
        [1002]: $localize`Email not found`,
        [1001]: $localize`Incorrect password`,
        [-999]: `Unkwon error`
    }
}