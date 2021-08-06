
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentModule } from './common-component/common-component.module';
import { MaterialModule } from '../../infrastructure/modules/material/material.module';
import { DataService } from './services/data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { DataVNService } from './services/data-vn/data-vn.service';
import { DataVNGqlService } from './services/data-vn/data-vn.gql.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CommonComponentModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SlickCarouselModule,
  ],
  providers: [
    DataService,
    DataVNGqlService,
    DataVNService
  ],
  exports: [
    CommonComponentModule,
    MaterialModule,
  ]
})
export class SharedModule { }
