import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'header-admin',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() sidenav: MatSidenav;
  // TODO: update real data
  public firstName = 'ADMIN';

  constructor(
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  public logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['auth/sign-in']);
    this.toastr.success('Đăng xuất thành công!');
  }

}
