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
      /*Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 192
Content-Type: application/json; charset=utf-8
Date: Sat, 20 Jun 2020 22:14:04 GMT
ETag: W/"c0-i7aamNUQ7+Np9T14n5DyiJbhVnk"
Set-Cookie: Authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTkyNjkxMjQ0LCJleHAiOjE1OTI2OTQ4NDR9.f1TCYoyFUI8jdpk2JVlQwGq4vY0i-OoDDBLa5q9yQEk; HttpOnly; Max-Age=3600;
X-Powered-By: Express*/
    constructor(private httpSrv: HttpClient) {

    }
    
    private get endPoint(): string {
        return `http://localhost:3000/`;
    }

    async getUsers() {
        return this.httpSrv.get(`${this.endPoint}users`, this.httpOptions).toPromise();
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
}