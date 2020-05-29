import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './screens/users/users.component';
import { ReportsComponent } from './screens/reports/reports.component';
import { TasksComponent } from './screens/tasks/tasks.component';


const routes: Routes = [{
    path: 'users',
    component: UsersComponent    
  }, {
    path: 'reports',
    component: ReportsComponent    
  }, {
    path: 'tasks',
    component: TasksComponent    
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
