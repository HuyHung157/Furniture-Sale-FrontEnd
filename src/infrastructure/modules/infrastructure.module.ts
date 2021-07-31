import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AllComponentsModule } from './all-components.module';
import { MaterialModule } from './material/material.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    AllComponentsModule,
  ],
  exports: [MaterialModule, AllComponentsModule],
})
export class InfrastructureModule {}
