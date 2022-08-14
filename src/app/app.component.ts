import { Component, OnInit } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './shared/services/localstorage.service';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    {provide: MAT_DATE_LOCALE, useValue: 'vi-VN'},
  ]
})
export class AppComponent implements OnInit{
  public name;
  constructor(
    private readonly translateService: TranslateService,
    private readonly localStorageService: LocalStorageService,
    private adapter: DateAdapter<any>,
  ){}

  ngOnInit(): void{
    this.initTranslation();
    this.getUserInfo();
  }

  private getUserInfo(){
    const a = this.localStorageService.getItem("user");
    console.log(a);
  }

  private initTranslation(){
    const browserLanguage = this.translateService.getBrowserLang();
    const supportedLanguages = environment.supportedLanguages || [];
    const isBrowserLanguageSupported = supportedLanguages.indexOf(browserLanguage) > -1;
    const language = isBrowserLanguageSupported ? browserLanguage : environment.defaultLanguage;
    this.translateService.setDefaultLang(language);
    this.translateService.use(language);
    if(isBrowserLanguageSupported){
      return;
    }
    this.adapter.setLocale('en')
  }

}
