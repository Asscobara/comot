import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { SessionServiceService } from 'src/app/services/session-service.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent extends RegisterComponent implements OnInit {

  constructor(sessionSrv: SessionServiceService) {
    super(sessionSrv)
   }

  ngOnInit(): void {
  }

}
