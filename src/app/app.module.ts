import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogComponent } from './controls/dialog/dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MainShellComponent } from './shell/main-shell/main-shell.component';
import { ToolBarComponent } from './shell/tool-bar/tool-bar.component';
import { SideMenuComponent } from './shell/side-menu/side-menu.component';
import { UsersComponent } from './screens/users/users.component';
import { ReportsComponent } from './screens/reports/reports.component';
import { TasksComponent } from './screens/tasks/tasks.component';
import { DataService } from './services/data.service';
import { UserComponent } from './forms/user/user.component';
import { DialogFactoryService } from './services/dialog-factory.service';
import { DialogService } from './services/dialog.service';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatDialogModule, 
    HttpClientModule,
    FormsModule
  ],
  providers: [
    DataService,
    DialogFactoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
