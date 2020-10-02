import { Component, OnInit } from '@angular/core';
import { onMainContentChange } from './animations/animations';
import { SidenavService } from './services/sidenav.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [onMainContentChange]
})
export class DashboardComponent implements OnInit {
  name = 'Angular';
  public onSideNavChange: boolean;

  constructor(private _sidenavService: SidenavService) {
    this._sidenavService.sideNavState$.subscribe(res => {
      console.log(res)
      this.onSideNavChange = res;
    })
  }

  ngOnInit() {

  }

}
