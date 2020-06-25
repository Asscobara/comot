import { Component, OnInit } from '@angular/core';
import { SessionServiceService } from 'src/app/services/session-service.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {

  public loginUser: string;
  constructor (public sessionSrv: SessionServiceService, private route: Router) { 
    
  }

  ngOnInit(): void {
  }

  public logout() { 
    this.sessionSrv.user = null;
    this.route.navigate(['/']);
  }
    
}
