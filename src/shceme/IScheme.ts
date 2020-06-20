
export interface IUser {
    id: number;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    is_looged_in: boolean;
}

export interface IResidant extends IUser {
    apprtment: number
}