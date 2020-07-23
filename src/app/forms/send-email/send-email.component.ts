import { Component, OnInit } from '@angular/core';
import { FormBaseClass } from 'src/app/controls/forms/formBaseClass';
import { IUser, ISendEmail } from 'src/shceme/IScheme';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent extends FormBaseClass<ISendEmail> implements OnInit {

  constructor() { 
    super();    
  }

  ngOnInit(): void {
  }

}
