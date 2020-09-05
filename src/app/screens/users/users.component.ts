import { Component, ChangeDetectorRef } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { UserComponent } from 'src/app/forms/user/user.component';
import { IUser } from 'src/shceme/IScheme';
import { InterfaceBase, IUserHelper } from 'src/shceme/shcemeHelper';
import { AbsScreenComponent, ButtonActions } from '../abs-screen/abs-screen.component';
import { SessionServiceService } from 'src/app/services/session-service.service';
import { DialogComponent } from 'src/app/controls/dialog/dialog.component';
import { SendEmailComponent } from 'src/app/forms/send-email/send-email.component';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-users',
  templateUrl: './../abs-screen/abs-screen.component.html',
  styleUrls: ['./../abs-screen/abs-screen.component.css']
})
export class UsersComponent extends AbsScreenComponent<IUser> {

  constructor (
    private dataSrv: DataService, 
    sessionSrv: SessionServiceService,    
    changeDetect: ChangeDetectorRef, 
    dialogSrv: MatDialog, 
    changeDetector: ChangeDetectorRef, 
    deviceDetectorService: DeviceDetectorService) {
    super(dialogSrv, changeDetect, UserComponent, sessionSrv, changeDetector, deviceDetectorService); 
  }

  protected buildGridData() {
    this.gridData = {
      title: $localize`Users`,
      columns: [
        {displayName: '#', fieldName: 'id'},
        {displayName: $localize`First Name`, fieldName: 'first_name'},
        {displayName: $localize`Last Name`, fieldName: 'last_name'},
        {displayName: $localize`Email`, fieldName: 'email'},
        {displayName: $localize`Phone`, fieldName: 'phone'},
        {displayName: $localize`Floor`, fieldName: 'floor_number'},
        {displayName: $localize`Apartment`, fieldName: 'apartment_number'},
        {displayName: $localize`Role`, fieldName: 'role_id', fieldNameSource: (roleId) => this.sessionSrv.roles[roleId].displayName }],
      rows: [],
      buttons: [
        { title: $localize`New`, action: ButtonActions.new, icon: 'add_circle_outline' }, 
        { title: $localize`Send Mail`, action: ButtonActions.custome, icon: 'email', actionData: { name: 'sendEmail', selected: [] } },
        { title: $localize`Delete`, action: ButtonActions.delete, icon: 'remove_circle_outline' }
      ],
      canEditData: this.sessionSrv.user?.role_id == 2
    }

    this.data.forEach( (user: IUser) => {
      this.gridData.rows.push(user);
    });
  }

  protected handleCustomeAction(btn: any) {
    if (btn.actionData.name == 'sendEmail') {
      const emails = btn.actionData.selected.map( (u: IUser) => u.email);
      this.dialogSrv.open(DialogComponent, {
        "minWidth": 250,
        "data": { 
          content: SendEmailComponent, 
          instanceContext: { emails: emails, message: '' }, 
          title: $localize`Send Email`
        }
      }).afterClosed().subscribe((sendEmailData) => {
        if (sendEmailData) {
          this.dataSrv.sendEmail(sendEmailData)
        }
      });;
    }
  }

  protected getEmptyT(): IUser {
    return InterfaceBase.getEmptyT(new IUserHelper());
  }

  protected async loadData() {
    return this.dataSrv.getUsers(this.sessionSrv.user);
  }

  protected update(data: IUser) {
    return this.dataSrv.updateUser(data).then(() => {
      this.sessionSrv.updateUsers();
    });
  }

  protected create(data: IUser) {
    data.address_id = this.sessionSrv.user.address_id;
    return this.dataSrv.createUser(data).then(() => {
      this.sessionSrv.updateUsers();
    });
  }

  protected delete(id: number) {
    return this.dataSrv.deleteUser(id);
  }

}

