import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CashierDashboardComponent } from './cashier-dashboard/cashier-dashboard.component';
import { WaiterDashboardComponent } from './waiter-dashboard/waiter-dashboard.component';

const routes: Routes = [
  {path:'', redirectTo:'dashboard',pathMatch:'full'},
  {path:'dashboard',component:DashboardComponent},
  {path:'cashier', component: CashierDashboardComponent},
  {path:'waiter', component: WaiterDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
