import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from 'src/shceme/IScheme';

@Injectable()
export class DataService {
    constructor(private httpSrv: HttpClient) {

    }

    async getUsers() {
        return this.httpSrv.get('/assets/mock/users.json');
    }
}