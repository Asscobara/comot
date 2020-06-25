import { Injectable } from '@angular/core';
import { IUser } from 'src/shceme/IScheme';

@Injectable({
  providedIn: 'root'
})
export class SessionServiceService {

  public user: IUser;
  public register: boolean = false;
  
  constructor() { 
  }

}
