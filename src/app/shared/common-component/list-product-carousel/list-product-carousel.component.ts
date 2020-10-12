import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-product-carousel',
  templateUrl: './list-product-carousel.component.html',
  styleUrls: ['./list-product-carousel.component.scss']
})
export class ListProductCarouselComponent implements OnInit {
  @Input() listTitle: string;

  constructor() { }

  ngOnInit(): void {
  }

}
