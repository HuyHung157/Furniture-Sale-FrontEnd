import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public isBanner = true;
  public slideTopSell = [50, 60, 80];
  public slideBanner = [22, 44, 12, 50];

  constructor() { }

  ngOnInit(): void {
  }

}
