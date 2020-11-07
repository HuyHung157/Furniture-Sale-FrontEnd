import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  public listTag;

  constructor() { }

  ngOnInit(): void {
    this.listTag = this.getListReviewTag();
  }

  private getListReviewTag() {
    const list = [
      {
        background: '',
        title: 'sản phẩm',
        content: '12',
        action: () => { },
      },
      {
        background: 'red',
        title: 'danh mục',
        content: '13',
        action: () => { },
      },
      {
        background: 'blue',
        title: 'đơn hàng',
        content: '14',
        action: () => { },
      },
      {
        background: 'pink',
        title: 'tài khoản',
        content: '15',
        action: () => { },
      },
      {
        background: 'cyan',
        title: 'doanh số',
        content: '16.000',
        isPrice: true,
        action: () => { },
      },
    ];
    return list;
  }

}
