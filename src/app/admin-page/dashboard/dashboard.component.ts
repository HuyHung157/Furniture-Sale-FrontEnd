import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/localstorage.service';
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

  constructor(
    private sideNavService: SidenavService,
    private readonly localStorageService: LocalStorageService,
  ) {
    this.sideNavService.sideNavState$.subscribe(res => {
      this.onSideNavChange = res;
    });
  }

  ngOnInit() {
    this.getUserToken();
  }

  private getUserToken(){
    const a = this.localStorageService.getItem("user");
    console.log(a);
  }

}
