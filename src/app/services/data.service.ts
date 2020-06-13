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

    async getUsers() {
        return this.httpSrv.get('http://localhost:3000/users', this.httpOptions);
    }

    async updateUser(user: IUser) {
        this.httpSrv.put(`http://localhost:3000/users/${user.id}/`, user, this.httpOptions).subscribe((u) => {
            console.log('updated');
        });
    }

    async deleteUser(id: number) {
        return this.httpSrv.delete(`http://localhost:3000/users/${id}`).subscribe(() => {
            console.log('deleted');
        });        
    }

    async createUser(user: IUser) {
        return this.httpSrv.post(`http://localhost:3000/users/`, user, this.httpOptions).subscribe(() => {
            console.log('created');
        });
    }

}