import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './screens/users/users.component';
import { ReportsComponent } from './screens/reports/reports.component';
import { TasksComponent } from './screens/tasks/tasks.component';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { IsLoggedInGuard } from './guards/is-logged-in.guard';


const routes: Routes = [{
    path: 'users',
    component: UsersComponent,
    canActivate: [IsLoggedInGuard]    
  }, {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [IsLoggedInGuard]    
  }, {
    path: 'tasks',
    component: TasksComponent, 
    canActivate: [IsLoggedInGuard]         
  }, {
    path: '',
    component: LoginScreenComponent,        
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
