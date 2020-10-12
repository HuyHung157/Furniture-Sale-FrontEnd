import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss']
})
export class ImageCarouselComponent implements OnInit {
  @Input() slides;
  @Input() isBanner: boolean;
  public slideConfig;

  constructor() { }

  ngOnInit(): void {
    this.slideConfig = this.getModeCarousel();
  }

  private getModeCarousel() {
    if (this.isBanner === false) {
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
    } else {
      return {
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: `<button class="btn-slide next-banner" ><i class="fa fa-chevron-right"></i></button>`,
        prevArrow: `<button class="btn-slide pre-banner" ><i class="fa fa-chevron-left"></i></button>`,
        dots: true,
        infinite: false,
      };
    }
  }


}
