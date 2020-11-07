import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCarouselComponent } from './image-carousel/image-carousel.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ListProductCarouselComponent } from './list-product-carousel/list-product-carousel.component';
import { BannerCarouselComponent } from './banner-carousel/banner-carousel.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';



@NgModule({
  declarations: [
    ImageCarouselComponent,
    ListProductCarouselComponent,
    BannerCarouselComponent,
    ProductItemComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    SlickCarouselModule
  ],
  exports: [
    BannerCarouselComponent,
    ImageCarouselComponent,
    ListProductCarouselComponent,
    ProductItemComponent,
    ConfirmDialogComponent
  ],
})
export class CommonComponentModule { }
