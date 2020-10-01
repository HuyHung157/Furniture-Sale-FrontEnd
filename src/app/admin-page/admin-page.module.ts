import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { AdminPageRoutingModule } from './admin-page-routing.module';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminPageRoutingModule
  ]
})
export class AdminPageModule { }
