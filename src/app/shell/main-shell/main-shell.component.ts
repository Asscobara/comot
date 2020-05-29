import { Component, OnInit } from '@angular/core';
import { ISideMenuItem } from '../side-menu/side-menu.component';

@Component({
  selector: 'app-main-shell',
  templateUrl: './main-shell.component.html',
  styleUrls: ['./main-shell.component.css']
})
export class MainShellComponent implements OnInit {

  constructor() { }
  
  public menuItems: ISideMenuItem[];
  ngOnInit(): void {
    this.menuItems = [];
    
    this.menuItems.push({ title: 'Users', path: 'users', icon: '' });
    this.menuItems.push({ title: 'Reports', path: 'reports', icon: '' });
    this.menuItems.push({ title: 'Tasks', path: 'tasks', icon: '' });

  }

}
