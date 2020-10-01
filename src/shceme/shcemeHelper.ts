
import {IUser, ISupplier, IPrice, ISchedule, ITask, ITransaction, IEvent} from './IScheme';

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

export class IScheduleHelper extends InterfaceBase<ISchedule> {

    constructor() {
        super();
    }

    getEmpty(): ISchedule {
        return {
            id: 0,
            start_date: new Date(),
            end_date: new Date(),
            recuring: false,
            recuring_every_in_days: 0  
        }
    }
}


export class ITaskHelper extends InterfaceBase<ITask> { 
    
    constructor() {
        super();
    }

    getEmpty(): ITask { 
        return {
            id: 0,
            category_id: 0,
            user_id: InterfaceBase.getEmptyT(new IUserHelper()),
            status_id: 0,
            sipplier_id: InterfaceBase.getEmptyT(new ISuplierHelper()),
            create_date: new Date(),
            update_date: new Date(),
            schedule_id: InterfaceBase.getEmptyT(new IScheduleHelper()),
            grade: 0,
            price: 0,
            address_id: 0,
            description: ''
        }
    }
}


export class ITransactionHelper extends InterfaceBase<ITransaction> { 
    
    constructor() {
        super();
    }

    getEmpty(): ITransaction { 
        return {
            id: 0,
            amount: 0,
            transaction_type: 0,
            date_time: Date.now(),
            user_id: 0,
            remark: '',
            send_recipt: false              
        }
    }
}

export class IEventHelper extends InterfaceBase<IEvent> {
    constructor() {
        super();
    }

    getEmpty(): IEvent { 
        return {
            id: 0,
            name: '',
            create_date: Date.now(),
            schedule_id: InterfaceBase.getEmptyT(new IScheduleHelper()),
            remark: '',
            status_id: 1,
            address_id: 0,
            user_ids: []          
        }
    }
}