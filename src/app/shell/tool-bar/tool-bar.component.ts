import { Component, OnInit } from '@angular/core';
import { SessionServiceService } from 'src/app/services/session-service.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {

  public loginUser: string;
  constructor (
    public sessionSrv: SessionServiceService) { 

  }

  ngOnInit(): void {
  }

  public logout() { 
    this.sessionSrv.logOut();
  }

  public setAddres() {
    this.sessionSrv.setAddres();  
  }

  public showAbout() {
    this.sessionSrv.showAbout();
  }
  
  public setConfiguration() {
    this.sessionSrv.setConfiguration();
  }
}