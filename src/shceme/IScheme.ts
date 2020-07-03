
export interface ILogin {
    user: IUser,
    errors: any;
}

export interface IUser {
    id: number;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    is_logged_in: boolean;
    role_id: number;
    phone: string;
    remark: string;
    address_id: number;
    floor_number: number;
    apartment_number: number;
}

export interface IResidant extends IUser {
    apprtment: number
}

export interface IAddress {
    id: number;
    title: string;
    description: string;
    street: string;
    city: string;
}
