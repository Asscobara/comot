import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  @Input() title: string;
  @Input() menuItems: ISideMenuItem[];

  constructor() { }

  ngOnInit(): void {
  }

}

export interface ISideMenuItem {
  title: string;
  path: string;
  icon: string;
}
