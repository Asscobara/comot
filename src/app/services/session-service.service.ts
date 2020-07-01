import { Injectable } from '@angular/core';
import { IUser, IAddress } from 'src/shceme/IScheme';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import { MatDialog } from '@angular/material/dialog';
import { AddressComponent } from '../forms/address/address.component';
import { DialogComponent } from '../controls/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class SessionServiceService {
  
  public readonly version: string = "0.0.1";
  public readonly contactEmail: string = "comot@gmail.com";
  public readonly appName: string = $localize`ComOt`;
    
  private _user: IUser; 
  private _address: IAddress;

  public get user(): IUser {
    return this._user;
  }
  
  public set user(value: IUser) {
    this._user = value;
    if (this.user && this.user.address_id) {
      this.dataSrv.getUserAddress(this.user.id).then( (a: any) => {
        this.address = a.data;
      });
    }
  }

  public get address(): IAddress {
    return this._address;
  }
  
  public set address(value: IAddress) {
    this._address = value;
  }

  public register: boolean = false;
  
  public readonly roles: IRoleMap = {
      1: { dbName: 'admin', displayName: $localize`Admin` },
      2: { dbName: 'manager', displayName: $localize`Manager` },
      3: { dbName: 'user', displayName: $localize`User` },
      4: { dbName: 'guest', displayName: $localize`Guest` },
  }

  constructor(
    private route: Router, 
    private dialogSrv: MatDialog, 
    private dataSrv: DataService) { 
  }

  public logOut() {
    this.user = null;
    this.address = null;
    this.route.navigate(['/']);
  }

  public setAddres() {
    
    const isNew = this.user.address_id == null;

    this.dialogSrv.open(DialogComponent, {
      "minWidth": 250,
      "data": { 
        content: AddressComponent, 
        instanceContext: isNew ? {title: '', description: '', street: '', city: '' } : this.address, 
        title: isNew ? $localize`New address` : $localize`Edit address` 
      }
    }).afterClosed().subscribe( async (d: IAddress) =>  {     
      if (d) {
        this.address = d;
        if (isNew) {
          const address = await this.dataSrv.createAddress(this.address);
          debugger;
          this.user.address_id = (address as any)?.data?.insertId;
          await this.dataSrv.updateUser(this.user);
        } else {
          await this.dataSrv.updateAddress(this.address);
        }        
      }
    });
  }
 
}

export interface IRole {
  dbName: string, 
  displayName: string
}

export interface IRoleMap {
  [name: string]: IRole
}