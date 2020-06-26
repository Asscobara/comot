import { Component, OnInit } from '@angular/core';
import { SessionServiceService } from 'src/app/services/session-service.service';
import { DataService } from 'src/app/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/controls/dialog/dialog.component';
import { AddressComponent } from 'src/app/forms/address/address.component';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {

  public loginUser: string;
  constructor (
    public sessionSrv: SessionServiceService, 
    private dataSrv: DataService) { 

  }

  ngOnInit(): void {
  }

  public logout() { 
    this.sessionSrv.logOut();
  }

  public setAddres() {
    this.sessionSrv.setAddres();  
  }
}