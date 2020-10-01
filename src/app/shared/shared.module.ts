
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentModule } from './common-component/common-component.module';
import { MaterialModule } from '../material/material.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CommonComponentModule,
    // HttpClient,
    MaterialModule
  ]
})
export class SharedModule { }
