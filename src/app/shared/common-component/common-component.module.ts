import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCarouselComponent } from './image-carousel/image-carousel.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ListProductCarouselComponent } from './list-product-carousel/list-product-carousel.component';



@NgModule({
  declarations: [ImageCarouselComponent, ListProductCarouselComponent],
  imports: [
    CommonModule,
    SlickCarouselModule
  ],
  exports: [
    ImageCarouselComponent
  ],
})
export class CommonComponentModule { }
