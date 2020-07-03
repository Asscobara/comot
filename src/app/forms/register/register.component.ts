import { Component, OnInit } from '@angular/core';
import { FormBaseClass } from 'src/app/controls/forms/formBaseClass';
import { IUser } from 'src/shceme/IScheme';
import { FormControl, Validators } from '@angular/forms';
import { SessionServiceService } from 'src/app/services/session-service.service';
import { ValidatorNames, CustomValidators } from 'src/app/validators/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends FormBaseClass<IUser>  implements OnInit {

  public emailControl: FormControl = new FormControl(); 
  public passwordMatchControl: FormControl = new FormControl();
  public passwordControl: FormControl = new FormControl();

  public passwordMatch: string;

  constructor(public sessionSrv: SessionServiceService) { 
    super();
    this.emailControl.setValidators([Validators.required, Validators.email]);
    this.passwordControl.setValidators([CustomValidators.passwordValidator, Validators.required]);
    this.passwordMatchControl.setValidators([CustomValidators.textMatchValidator(this.passwordControl)]);
  }

  ngOnInit(): void {
    
    // Set empty 
    this.context.floor_number = 0;
    this.context.apartment_number = 0;

    this.formGroup.addControl(ValidatorNames.required, this.emailControl);
    this.formGroup.addControl(ValidatorNames.password, this.passwordControl);
    this.formGroup.addControl(ValidatorNames.matchWith, this.passwordMatchControl);
  }

  
}
