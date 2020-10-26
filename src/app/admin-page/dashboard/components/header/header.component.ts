import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'header-admin',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() sidenav: MatSidenav;
  public firstName = 'Hùng';

  constructor(
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  public logout(): void {
    this.router.navigate(['auth/sign-in']);
  }

}
