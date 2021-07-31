import { Component, Input, OnInit } from '@angular/core';
import { LocalSpinnerService } from '../../../app/shared/services/local-spinner.service';

@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.scss']
})
export class PhoneInputComponent implements OnInit {
  constructor(private readonly localSpinnerService: LocalSpinnerService) {}

  ngOnInit(): void {
    
  }
}
