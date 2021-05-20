import { Component, Input, OnInit } from '@angular/core';
import { LocalSpinnerService } from '../../services/local-spinner.service';

@Component({
  selector: 'app-local-spinner',
  templateUrl: './local-spinner.component.html',
  styleUrls: ['./local-spinner.component.scss']
})
export class LocalSpinnerComponent implements OnInit {

  @Input() componentId: string;

  public showSpinner = false;

  constructor(private readonly localSpinnerService: LocalSpinnerService) {}

  ngOnInit(): void {
    if (this.componentId) {
      this.localSpinnerService
        .registerComponent(this.componentId)
        .subscribe((loading: boolean) => {
          console.log(loading);
          this.showSpinner = loading;
        });
    }
  }
}
