import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ListProductCarouselComponent } from './list-product-carousel/list-product-carousel.component';
import { BannerCarouselComponent } from './banner-carousel/banner-carousel.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';
import { ImageCropperDialogComponent } from './image-cropper-dialog/image-cropper-dialog.component';
import { ImageCropperModule } from 'ngx-image-cropper';

const components: Type<any>[] = [
  BannerCarouselComponent,
  ListProductCarouselComponent,
  ProductItemComponent,
  ConfirmDialogComponent,
  ImageUploaderComponent,
  ImageCropperComponent,
  ImageCropperDialogComponent
]

@NgModule({
  declarations: [ components ],
  imports: [
    CommonModule,
    SlickCarouselModule,
    ImageCropperModule
  ],
  exports: [ components ],
})
export class CommonComponentModule { }
