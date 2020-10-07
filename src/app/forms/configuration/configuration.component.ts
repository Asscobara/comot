import { Component, OnInit } from '@angular/core';
import { FormBaseClass } from 'src/app/controls/forms/formBaseClass';
import { IConfiguration } from 'src/shceme/IScheme';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent extends FormBaseClass<IConfiguration> implements OnInit {

  constructor() {
    super();
   }

  ngOnInit(): void {
  }

  public keyDisplayName(key: string): string {
    switch(key) {
      case 'send_email_alerts':         return $localize`Send email alerts`;
      case 'event_alert':               return $localize`Event alert active`;
      case 'event_alert_days':          return $localize`Days before event to alert`;
      case 'payment_alert':             return $localize`Payment alert active`;
      case 'task_alert':                return $localize`Task alert active`;
      case 'task_max_pending_days':     return $localize`Task maximum status Pending in days`;
      case 'task_max_new_days':         return $localize`Task maximum status New in days`;
    }
    return $localize`N/A`;
  }

  public keyFieldType(key: string): string {
    switch(key) {
      case 'send_email_alerts':       return 'check';
      case 'event_alert':             return 'check';
      case 'event_alert_days':        return 'text';
      case 'payment_alert':           return 'check';
      case 'task_alert':              return 'check';
      case 'task_max_pending_days':   return 'text';
      case 'task_max_new_days':       return 'text';
    }
    return 'text';
  }
  public fieldValue(key: string, value: string): any {

    const toBoolean = (v: string) => {v == 'false' ? false: true};
    switch(key) {
      case 'send_email_alerts': return toBoolean(value);
      case 'event_alert':       return toBoolean(value);
      case 'event_alert_days':  return value;
      case 'payment_alert':     return toBoolean(value);
    }
    return value;
  }
  
}
