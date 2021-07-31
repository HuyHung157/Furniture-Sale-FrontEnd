import { CommonModule } from "@angular/common";
import { NgModule, Type } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ImageCropperModule } from "ngx-image-cropper";
import { CustomPaginationComponent } from "../components/custom-pagination/custom-pagination.component";
import { ImageCropperDialogComponent } from "../components/image-cropper-dialog/image-cropper-dialog.component";
import { ImageCropperComponent } from "../components/image-cropper/image-cropper.component";
import { ImageUploaderComponent } from "../components/image-uploader/image-uploader.component";
import { LocalSpinnerComponent } from "../components/local-spinner/local-spinner.component";
import { PhoneInputComponent } from "../components/phone-input.component.ts/phone-input.component";
import { MaterialModule } from "./material/material.module";

const components: Type<any>[] = [
  CustomPaginationComponent,
  ImageCropperComponent,
  ImageCropperDialogComponent,
  ImageUploaderComponent,
  LocalSpinnerComponent,
  PhoneInputComponent
];
@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ImageCropperModule,
    MaterialModule
  ],
  declarations: [components],
  exports: [components],
})
export class AllComponentsModule { }