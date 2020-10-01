import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
    // children: [
    // {
    //   path: 'auth',
    //   component: 
    // },
    // {
    //   path: 'order',
    //   component: 
    // },
    // {
    //   path: 'product',
    //   component: 
    // },
    // {
    //   path: 'category',
    //   component: 
    // }
    // ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPageRoutingModule { }
