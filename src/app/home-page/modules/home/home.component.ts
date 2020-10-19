import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public isBanner = true;
  public slideTopSell = [50, 60, 80, 22, 16, 38, 90, 45, 23];
  public slideBanner = [22, 44, 12, 50];
  public titleTopSale = 'bán chạy';

  constructor() { }

  ngOnInit(): void {
  }

}
