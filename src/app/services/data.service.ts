import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser, IAddress, ITransaction } from 'src/shceme/IScheme';

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
        return `http://localhost:3000/`;
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
}
    