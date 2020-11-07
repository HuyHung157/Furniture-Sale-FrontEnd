import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss']
})
export class ImageCarouselComponent implements OnInit {
  @Input() listProduct;

  public slideConfig;

  constructor() { }

  ngOnInit(): void {
    this.slideConfig = this.getModeCarousel();
  }


  private getModeCarousel() {
    return {
      slidesToShow: 4,
      slidesToScroll: 1,
      nextArrow: `<button class="btn-slide next-list" ><i class="fa fa-chevron-right"></i></button>`,
      prevArrow: `<button class="btn-slide pre-list" ><i class="fa fa-chevron-left"></i></button>`,
      dots: false,
      infinite: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 770,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    };
  }

}
