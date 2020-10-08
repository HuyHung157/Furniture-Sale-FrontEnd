import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { AdminPageRoutingModule } from './admin-page-routing.module';
import { HeaderComponent } from './dashboard/components/header/header.component';
import { SideNavComponent } from './dashboard/components/side-nav/side-nav.component';
import { AdminPageComponent } from './admin-page.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SideNavComponent,
    HeaderComponent,
    AdminPageComponent
  ],
  imports: [
    CommonModule,
    AdminPageRoutingModule,
    SharedModule,
  ]
})
export class AdminPageModule { }
