import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser, IAddress, ITransaction, ICategory, ISupplier, ITask, ISendEmail, IPrice, IAlert, IEvent } from 'src/shceme/IScheme';
import { environment } from 'src/environments/environment';

@Injectable()
export class DataService {

    httpOptions = {
        headers: new HttpHeaders({ 
          'Access-Control-Allow-Origin':'*'
        })
      };
   
    constructor(private httpSrv: HttpClient) {

    }
    
    //#region  Users
    private get endPoint(): string {
        return environment.serverurl;
    }

    async getUser(userId: number) {
        return this.httpSrv.get<IUser>(`${this.endPoint}users/${userId}/`, this.httpOptions).toPromise<IUser>();
    }

    async getUsers(user: IUser) {
        return this.httpSrv.get(`${this.endPoint}usersById/${user.id}/`, this.httpOptions).toPromise();
    }

    async updateUser(user: IUser) {
        return this.httpSrv.put(`${this.endPoint}users/${user.id}/`, user, this.httpOptions).toPromise();
    }

    async deleteUser(id: number) {
        return this.httpSrv.delete(`${this.endPoint}users/${id}`).toPromise();
    }

    async createUser(user: IUser) {
        return this.httpSrv.post(`${this.endPoint}users/`, user, this.httpOptions).toPromise();
    }

    async register(user: IUser) {
       return this.httpSrv.post(`${this.endPoint}signup/`, user, this.httpOptions).toPromise();
    }

    async login(user: IUser) {
       return this.httpSrv.post(`${this.endPoint}login/`, user, this.httpOptions).toPromise();
    }

    async logout(user: IUser) {
       return this.httpSrv.post(`${this.endPoint}logout/`, user, this.httpOptions).toPromise();
    }

    async updatePassword(user: IUser) {
        return this.httpSrv.post(`${this.endPoint}password/`, user, this.httpOptions).toPromise();
    }

    async updateRole(user: IUser) {
        return this.httpSrv.put(`${this.endPoint}users/role/${user.id}/`, user, this.httpOptions).toPromise();
    }

    //#endregion

    //#region Address
    async getUserAddress(userId: number) {
        return this.httpSrv.get(`${this.endPoint}address/${userId}/`, this.httpOptions).toPromise();
    }

    async createAddress(address: IAddress) {
        return this.httpSrv.post(`${this.endPoint}address/`, address, this.httpOptions).toPromise();
    }

    async updateAddress(address: IAddress) {
        return this.httpSrv.put(`${this.endPoint}address/${address.id}/`, address, this.httpOptions).toPromise();
    }
    //#endregion


    //#region Transaction
    async deleteTransaction(transactionId: number) {
        return this.httpSrv.delete(`${this.endPoint}transactions/${transactionId}/`, this.httpOptions).toPromise();
    }

    async createTransaction(transaction: ITransaction) {
        return this.httpSrv.post(`${this.endPoint}transactions/`, transaction, this.httpOptions).toPromise();
    }

    async getAddressTransaction(addressId: number) { 
        return this.httpSrv.get(`${this.endPoint}transactions/${addressId}/`, this.httpOptions).toPromise();
    }

    async updateTransaction(transaction: ITransaction) { 
        return this.httpSrv.put(`${this.endPoint}transactions/${transaction.id}/`, transaction, this.httpOptions).toPromise();
    }
    //#endregion

    //#region Category
    async createCategoy(category: ICategory) {
        return this.httpSrv.post(`${this.endPoint}categories/`, category, this.httpOptions).toPromise();
    }

    async getCategories() { 
        return this.httpSrv.get(`${this.endPoint}categories/`, this.httpOptions).toPromise();
    }

    async updateCategory(category: ITransaction) { 
        return this.httpSrv.put(`${this.endPoint}categories/${category.id}/`, category, this.httpOptions).toPromise();
    }

    async deleteCategory(category: ITransaction) { 
        return this.httpSrv.delete(`${this.endPoint}categories/${category.id}/`, this.httpOptions).toPromise();
    }
    //#endregion

     //#region Category
     async createSupplier(supplier: ISupplier) {
        return this.httpSrv.post(`${this.endPoint}suppliers/`, supplier, this.httpOptions).toPromise();
    }

    async getSuppliers(userId: number) { 
        return this.httpSrv.get(`${this.endPoint}suppliers/${userId}/`, this.httpOptions).toPromise();
    }

    async updateSupplier(supplier: ISupplier) { 
        return this.httpSrv.put(`${this.endPoint}suppliers/${supplier.id}/`, supplier, this.httpOptions).toPromise();
    }

    async deleteSupplier(supplierId: number) { 
        return this.httpSrv.delete(`${this.endPoint}suppliers/${supplierId}/`, this.httpOptions).toPromise();
    }
    //#endregion

    //#region Task
    async getTasks(address: IAddress) {
        return this.httpSrv.get(`${this.endPoint}tasks/${address.id}/`, this.httpOptions).toPromise();
    }
    
    async  updateTask(task: ITask) {
        return this.httpSrv.put(`${this.endPoint}tasks/${task.id}/`, task, this.httpOptions).toPromise();
    }
    
    async createTask(task: ITask) {    
        return this.httpSrv.post(`${this.endPoint}tasks/`, task, this.httpOptions).toPromise();
    }
    
    async deleteTask(taskId: number) {
        return this.httpSrv.delete(`${this.endPoint}tasks/${taskId}/`, this.httpOptions).toPromise();
    }
    //#endregion 

    //#region Email
    async sendEmail(sendEmailData: ISendEmail) {
        return this.httpSrv.post(`${this.endPoint}mail/`, sendEmailData, this.httpOptions).toPromise();
    }
    //#endregion

    //#region Reports
    async getTotalPaymentSummary(addressId: number, from_date: any) {
        return this.httpSrv.get(`${this.endPoint}report/payments_summary/${addressId}/${from_date}/`, this.httpOptions).toPromise();
    }

    async getPaymentsStatus(addressId: number, from_date: any) {
        return this.httpSrv.get(`${this.endPoint}report/payments/${addressId}/${from_date}/`, this.httpOptions).toPromise();
    }

    async getSupliersReport(addressId: number) {
        return this.httpSrv.get(`${this.endPoint}report/suppliers/${addressId}/`, this.httpOptions).toPromise();
    }


    async getTasksReport(addressId: number) {
        return this.httpSrv.get(`${this.endPoint}report/tasks/${addressId}/`, this.httpOptions).toPromise();
    }
    //#endregion

     //#region PriceList
     async getSuplierPriceList(supplierId: number) {
        return this.httpSrv.get(`${this.endPoint}priceList/${supplierId}/`, this.httpOptions).toPromise();
    }

    async createSuplierPrice(price: IPrice) {
        return this.httpSrv.post(`${this.endPoint}priceList/`, price, this.httpOptions).toPromise();
    }

    async updateSuplierPrice(price: IPrice) {
        return this.httpSrv.put(`${this.endPoint}priceList/${price.id}/`, price, this.httpOptions).toPromise();
    }

    async deleteSuplierPrice(priceId: number) {
        return this.httpSrv.delete(`${this.endPoint}priceList/${priceId}/`, this.httpOptions).toPromise();
    }
    //#endregion

    //#region Alerts
    async getAlerts(userId: number) {
        return this.httpSrv.get(`${this.endPoint}alerts/${userId}/`, this.httpOptions).toPromise();
    }

    async deleteAlert(alertId: number) {
        return this.httpSrv.delete(`${this.endPoint}alerts/${alertId}/`, this.httpOptions).toPromise();
    }

    async updateAlert(alert: IAlert) {
        return this.httpSrv.put(`${this.endPoint}alerts/${alert.id}/`, alert, this.httpOptions).toPromise();
    }
    //#endregion

    //#region Events
    async getEvents(addressId: number) {
        return this.httpSrv.get(`${this.endPoint}events/${addressId}/`, this.httpOptions).toPromise();
    }

    async createEvent(event: IEvent) {
        return this.httpSrv.post(`${this.endPoint}events/`, event, this.httpOptions).toPromise();
    }

    async updateEvent(event: IEvent) {
        return this.httpSrv.put(`${this.endPoint}events/${event.id}/`, event, this.httpOptions).toPromise();
    }

    async deleteEvent(eventId: number) {
        return this.httpSrv.delete(`${this.endPoint}events/${eventId}/`, this.httpOptions).toPromise();
    }
    //#endregion
    
}
    