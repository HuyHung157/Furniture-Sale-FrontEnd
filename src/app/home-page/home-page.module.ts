import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageRoutingModule } from './home-page-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomePageComponent } from './home-page.component';
import { MaterialModule } from '../material/material.module';
import { HomeComponent } from './modules/home/home.component';



@NgModule({
  declarations: [HomePageComponent, HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    HomePageRoutingModule,
  ]
})
export class HomePageModule { }
