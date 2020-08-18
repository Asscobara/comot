import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './screens/users/users.component';
import { ReportsComponent } from './screens/reports/reports.component';
import { TasksComponent } from './screens/tasks/tasks.component';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { IsLoggedInGuard } from './guards/is-logged-in.guard';
import { TransactionsComponent } from './screens/transactions/transactions.component';
import { SuppliersComponent } from './screens/suppliers/suppliers.component';
import { HelpComponent } from './screens/help/help.component';


const routes: Routes = [{
    path: 'users',
    component: UsersComponent,
    canActivate: [IsLoggedInGuard]    
  },{
    path: 'transactions',
    component: TransactionsComponent,
    canActivate: [IsLoggedInGuard]
  },{
    path: 'reports',
    component: ReportsComponent,
    canActivate: [IsLoggedInGuard]    
  }, {
    path: 'tasks',
    component: TasksComponent, 
    canActivate: [IsLoggedInGuard]         
  }, {
    path: 'suppliers',
    component: SuppliersComponent, 
    canActivate: [IsLoggedInGuard]         
  }, {
    path: 'help',
    component: HelpComponent, 
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
