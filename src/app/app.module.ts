import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogComponent } from './controls/dialog/dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainShellComponent } from './shell/main-shell/main-shell.component';
import { ToolBarComponent } from './shell/tool-bar/tool-bar.component';
import { SideMenuComponent } from './shell/side-menu/side-menu.component';
import { UsersComponent } from './screens/users/users.component';
import { ReportsComponent } from './screens/reports/reports.component';
import { TasksComponent } from './screens/tasks/tasks.component';
import { DataService } from './services/data.service';
import { UserComponent } from './forms/user/user.component';
import { FieldComponent } from './controls/forms/inputs/field/field.component';
import { GridComponent } from './controls/grid/grid.component';
import { registerLocaleData, CommonModule } from '@angular/common';
import { CdkColumnDef } from '@angular/cdk/table';
import localeHe from '@angular/common/locales/he';
import localeHeExtra from '@angular/common/locales/extra/en';
import { PopupComponent } from './popups/popup/popup.component';
import { LoginComponent } from './forms/login/login.component';
import { RegisterComponent } from './forms/register/register.component';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { AddressComponent } from './forms/address/address.component';
import { PasswordComponent } from './forms/password/password.component';
import { TransactionsComponent } from './screens/transactions/transactions.component';
import { TransactionComponent } from './forms/transaction/transaction.component';
import { MatSelectModule } from '@angular/material/select';
import { UnderConstrcutionComponent } from './screens/under-constrcution/under-constrcution.component';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SuppliersComponent } from './screens/suppliers/suppliers.component';
import { SupplierComponent } from './forms/supplier/supplier.component';
import { WidgetComponent } from './controls/widget/widget.component';
import { RoleComponent } from './forms/role/role.component';
import { TaskComponent } from './forms/task/task.component';
import { SendEmailComponent } from './forms/send-email/send-email.component';
import { HelpComponent } from './screens/help/help.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { PriceComponent } from './forms/price/price.component';
import { PriceListComponent } from './screens/price-list/price-list.component';
import { FormContainerComponent } from './controls/forms/form-container/form-container.component';
import { AlertsComponent } from './controls/alerts/alerts.component';
import { MatBadgeModule } from '@angular/material/badge';
import { AlertsDialogComponent } from './controls/alerts/alerts-dialog/alerts-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EventsComponent } from './screens/events/events.component';
import { EventComponent } from './forms/event/event.component';
import { ScheduleComponent } from './forms/schedule/schedule.component';

registerLocaleData(localeHe, 'he-IL', localeHeExtra);

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    ToolBarComponent,
    MainShellComponent,
    SideMenuComponent,
    UsersComponent,
    ReportsComponent,
    TasksComponent,
    UserComponent,
    FieldComponent,
    GridComponent,
    PopupComponent,
    LoginComponent,
    RegisterComponent,
    LoginScreenComponent,
    AddressComponent,
    PasswordComponent,
    TransactionsComponent,
    TransactionComponent,
    UnderConstrcutionComponent,
    SuppliersComponent,
    SupplierComponent,
    PriceListComponent,
    WidgetComponent,
    RoleComponent,
    TaskComponent,
    SendEmailComponent,
    HelpComponent,
    PriceComponent,
    FormContainerComponent,
    AlertsComponent,
    AlertsDialogComponent,
    EventsComponent,
    EventComponent,
    ScheduleComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSliderModule,
    MatIconModule,
    MatDialogModule, 
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSortModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    DeviceDetectorModule,
    MatBadgeModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  providers: [
    DataService,
    CdkColumnDef
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
