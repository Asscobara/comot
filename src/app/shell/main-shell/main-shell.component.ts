import { Component, OnInit } from '@angular/core';
import { ISideMenuItem } from '../side-menu/side-menu.component';
import { SessionServiceService } from 'src/app/services/session-service.service';

@Component({
  selector: 'app-main-shell',
  templateUrl: './main-shell.component.html',
  styleUrls: ['./main-shell.component.css']
})
export class MainShellComponent implements OnInit {

  constructor(public sessionSrv: SessionServiceService) { }
  
  public menuItems: ISideMenuItem[];
  ngOnInit(): void {
    this.menuItems = [];
    
    this.menuItems.push({ title: $localize`Users`, path: 'users', icon: 'supervisor_account' });
    this.menuItems.push({ title: $localize`Reports`, path: 'reports', icon: 'poll' });
    this.menuItems.push({ title: $localize`Tasks`, path: 'tasks', icon: 'fact_check' });

  }

}
