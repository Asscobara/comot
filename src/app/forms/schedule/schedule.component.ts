import { Component, OnInit } from '@angular/core';
import { ISchedule } from 'src/shceme/IScheme';
import { FormBaseClass } from 'src/app/controls/forms/formBaseClass';
import { IOption } from 'src/app/controls/forms/inputs/field/field.component';
import { SessionServiceService } from 'src/app/services/session-service.service';
import { FormControl, Validators } from '@angular/forms';
import { ValidatorNames } from 'src/app/validators/validators';
import { Format } from 'src/app/utils/format';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent extends FormBaseClass<ISchedule> implements OnInit {

  public recoringEveryControl: FormControl = new FormControl();

  constructor(private sessionSrv: SessionServiceService) { 
      super();
      this.recoringEveryControl.setValidators([Validators.min(1) , Validators.max(365)]);
  }

  ngOnInit(): void {
    this.formGroup.addControl(ValidatorNames.range, this.recoringEveryControl);
  }

  public get start_date(): string {
    return Format.formatDate(new Date(this.context.start_date), '-', true);
  }

  public set start_date(value: string) {
    this.context.start_date = new Date(value);
  }

  public get end_date(): string {
    return Format.formatDate(new Date(this.context.end_date), '-', true);
  }

  public set end_date(value: string) {
    this.context.end_date = new Date(value);
  }
}