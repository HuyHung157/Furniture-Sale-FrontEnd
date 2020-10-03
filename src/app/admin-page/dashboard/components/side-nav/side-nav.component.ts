import { Component, OnInit } from '@angular/core';
import { onSideNavChange, animateText } from '../../animations/animations';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'side-nav-admin',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  animations: [onSideNavChange, animateText]
})
export class SideNavComponent implements OnInit {

  public sideNavState = false;
  public linkText = false;
  public navbarActions;

  constructor(private sidenavService: SidenavService) {
    this.navbarActions = [
      { name: 'Đơn hàng', icon: 'fas fa-money-bill', isSelected: false, subActions: this.orderActions },
      { name: 'Sản phẩm', link: '/product-list', icon: 'fas fa-archive', isSelected: false },
      { name: 'Danh mục', link: '/category-list', icon: 'fas fa-list', isSelected: false },
      { name: 'Tài khoản', icon: 'fas fa-users-cog', isSelected: false, subActions: this.accountActions },
    ];
  }

  orderActions = [
    { name: 'Vận chuyển', icon: 'fas fa-shipping-fast', isSelected: false },
    { name: 'Tình trạng', icon: 'fas fa-step-forward', isSelected: false }
  ];

  accountActions = [
    { name: 'Khách hàng', icon: 'fas fa-user-tie', isSelected: false },
    { name: 'Nhân viên', icon: 'fas fa-users', isSelected: false }
  ];

  ngOnInit() {
  }

  onSinenavToggle() {
    this.sideNavState = !this.sideNavState;

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200);
    this.sidenavService.sideNavState$.next(this.sideNavState);
  }

  public onSelect(action) {
    console.log(action);
  }

}
