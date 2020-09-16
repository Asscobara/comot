import { Injectable } from '@angular/core';
import { IUser, IAddress, ICategory, ISupplier } from 'src/shceme/IScheme';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import { MatDialog } from '@angular/material/dialog';
import { AddressComponent } from '../forms/address/address.component';
import { DialogComponent } from '../controls/dialog/dialog.component';
import { PopupComponent } from '../popups/popup/popup.component';

@Injectable({
  providedIn: 'root'
})
export class SessionServiceService {
  
  public readonly version: string = "0.0.3";
  public readonly contactEmail: string = "admin@comot.co.il";
  public readonly appName: string = `ComOt`;
    
  private _user: IUser; 
  private _address: IAddress;
  private _users: IUser[];
  private _categories: IDBDefaultMap;
  private _supliers: ISupplier[];

  public get supliers(): ISupplier[] {
    return this._supliers;
  }

  public set supliers(value: ISupplier[]) { 
    this._supliers = value;
  }

  public get categories(): IDBDefaultMap {
    return this._categories;
  }

  public set categories(value: IDBDefaultMap) { 
    this._categories = value;
  }

  public get users(): IUser[] {
    return this._users;
  }

  public set users(value: IUser[]) { 
    this._users = value;
  }

  public get user(): IUser {
    return this._user;
  }
  
  public set user(value: IUser) {
    this._user = value;
    if (this.user && this.user.address_id) {
      this.dataSrv.getUserAddress(this.user.id).then( (a: any) => {
        this.address = a.data;
      });
      this.updateSuppliers();      
    } else {
      if (this.user && !this.user.address_id) { 
        this.setAddres()
      }
    }
  }

  public async updateSuppliers() {
    const s = await this.dataSrv.getSuppliers(this.user.id);
    this.supliers = (s as any).data;    
  }

  public get address(): IAddress {
    return this._address;
  }
  
  public set address(value: IAddress) {
    this._address = value;
    this.updateUsers();
  }

  public updateUsers() {
    if (this.address) {
      this.dataSrv.getUsers(this.user).then( (a: any) => {
        this.users = a.data;
      });
    }
  }

  public register: boolean = false;
  
  public readonly roles: IDBDefaultMap = {
    // 1: { dbName: 'admin', displayName: $localize`Admin` },
    2: {dbId: 2, dbName: 'manager', displayName: $localize`Manager` },
    3: {dbId: 3, dbName: 'user', displayName: $localize`User` },
    4: {dbId: 4, dbName: 'guest', displayName: $localize`Guest` },
    5: {dbId: 5, dbName: 'supplier', displayName: $localize`Supplier` }
  }

  public readonly transactions: IDBDefaultMap = {
    1: {dbId: 1, dbName: 'income', displayName: $localize`Income`},
    2: {dbId: 2, dbName: 'expense', displayName: $localize`Expense`}
  }

  public readonly taskStatuses: IDBDefaultMap = {
    1: {dbId: 1, dbName: 'new', displayName: $localize`New`},
    2: {dbId: 2, dbName: 'inProgress', displayName: $localize`In Progress`},
    3: {dbId: 3, dbName: 'pending', displayName: $localize`Pending`},
    4: {dbId: 4, dbName: 'done', displayName: $localize`Done`},
    5: {dbId: 5, dbName: 'aborted', displayName: $localize`Aborted`}
  }

  constructor(
    private route: Router, 
    private dialogSrv: MatDialog, 
    private dataSrv: DataService) { 

      this.dataSrv.getCategories().then( (a: any) => {
        this.categories = {};
        a.data.forEach( (category: ICategory) => {
          this.categories[category.id] = { dbId: category.id, dbName: category.name, displayName: category.name };  
        });        
      });
  }

  public logOut() {
    this.user = null;
    this.address = null;
    this.route.navigate(['/']);
  }

  public showAbout() {
    const dialogRef = this.dialogSrv.open(PopupComponent,{
      data:{
        message: $localize`ComOt ${this.version}`,
        buttonText: {
          ok: $localize`OK`
        }
      }
    });
  }

  public getRoleId(roleName: string): number {

    let id = 0; // DB will failin case not exists
    Object.keys(this.roles).forEach(key => {
      if ( this.roles[key].dbName == roleName ) {
        id = this.roles[key].dbId;
      }
    });
    if (id == 0) {
      console.error(`role name ${roleName} does not exists.`);
    }
    return id; 
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
          this.user.address_id = (address as any)?.data?.insertId;
          this.address.id = this.user.address_id;
          await this.dataSrv.updateUser(this.user);           
        } else {
          await this.dataSrv.updateAddress(this.address);
        }        
      }
    });
  }
}

export interface IDBDEfault {
  dbId?: number;
  dbName: string, 
  displayName: string,
}

export interface IDBDefaultMap {
  [name: string]: IDBDEfault
}