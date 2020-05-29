import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './controls/dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'comot';
  
  constructor(private dialogSrv: MatDialog) {
    // this.dialogSrv.open(ComponentComponent);
  }
}
