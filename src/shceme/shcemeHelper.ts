
import {IUser, ISupplier, IPrice} from './IScheme';

export abstract class InterfaceBase<T> {
    abstract getEmpty(): T;

    static getEmptyT(interfaceHelperClass: InterfaceBase<any>) {
        return interfaceHelperClass.getEmpty();
    }
}

export class IUserHelper extends InterfaceBase<IUser> {
    constructor() {
        super();
    }

    getEmpty() {
        return {
            id: 0,
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            is_logged_in: false, 
            remark: '',
            role_id: 3,
            phone: '',
            address_id: 0,
            floor_number: 0,
            apartment_number: 0,
            registered: false
          }
    }
}

export class ISuplierHelper extends InterfaceBase<ISupplier> {
    constructor() {
        super();
    }

    getEmpty() {
        return {
            id: 0,
            category_id: 0,
            sub_categories_id: '',
            remark: '',
            user_id: InterfaceBase.getEmptyT(new IUserHelper())
        }
    }
}

export class IPriceHelper extends InterfaceBase<IPrice> {
    constructor() {
        super();
    }

    getEmpty() {
        return {
            id: 0,
            name: '',
            sub_category_id: null,
            supplier_id: InterfaceBase.getEmptyT(new ISuplierHelper()),
            price: 0
          }
    }
}
