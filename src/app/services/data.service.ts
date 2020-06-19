import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from 'src/shceme/IScheme';

@Injectable()
export class DataService {

    httpOptions = {
        headers: new HttpHeaders({ 
          'Access-Control-Allow-Origin':'*'
        })
      };
      
    constructor(private httpSrv: HttpClient) {

    }
    
    private get endPoint(): string {
        return `http://localhost:3000/`;
    }

    async getUsers() {
        return this.httpSrv.get(`${this.endPoint}users`, this.httpOptions).toPromise();
    }

    async updateUser(user: IUser) {
        this.httpSrv.put(`${this.endPoint}users/${user.id}/`, user, this.httpOptions).toPromise();
    }

    async deleteUser(id: number) {
        return this.httpSrv.delete(`${this.endPoint}users/${id}`).toPromise();
    }

    async createUser(user: IUser) {
        return this.httpSrv.post(`${this.endPoint}users/`, user, this.httpOptions).toPromise();
    }

}