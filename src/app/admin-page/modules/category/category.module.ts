import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoryService } from './services/category.service';
import { DataService } from 'src/app/shared/services/data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryRoutingModule } from './category-routing.module';
import { InfrastructureModule } from 'src/infrastructure/modules/infrastructure.module';

@NgModule({
  imports: [
    CommonModule,
    CategoryRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    InfrastructureModule
  ],
  declarations: [
    CategoryComponent,
    CategoryListComponent,
    CategoryFormComponent
  ],
  providers: [
    CategoryService,
    DataService
  ]
})
export class CategoryModule { }
