
export interface IUser {
    firstName: string,
    lastName: string,
    email: string,
    id: string,
    remark: string,
    createDate: Date,
    updateDate: Date
}

export interface IResidant extends IUser {
    apprtment: number
}