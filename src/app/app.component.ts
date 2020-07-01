import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './controls/dialog/dialog.component';
import { Router } from '@angular/router';
import { SessionServiceService } from './services/session-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'comot';
  
  constructor(
    route: Router, 
    sessionSrv: SessionServiceService) {
      route.events.subscribe(e => {
        if( (e as any).url && (e as any).url != '/' && sessionSrv.user == null) {
          route.navigate(['/'])
        }
      });
  }
}
