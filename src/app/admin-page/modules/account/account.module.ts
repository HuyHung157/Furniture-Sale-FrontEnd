import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';



@NgModule({
  declarations: [
    UserListComponent,
    EmployeeListComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
