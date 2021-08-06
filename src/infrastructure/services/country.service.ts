import { Injectable } from '@angular/core';
declare var require: any;

export interface CountryType {
  dial_code: string;
  name: string;
  flag?: any;
  code?: string;
}

@Injectable({ providedIn: 'root' })
export class CountryService {
  private countries: CountryType[];

  public getCountriesData() {
    if (!this.countries) {
      const importCountries = require('../json/country_dial_info.json');
      this.countries = importCountries.map((country) => ({
        dial_code: country.dial_code,
        name: country.name,
        flag: country.flag,
        code: country.code
      }));
    }
    return this.countries;
  }

  public getCountries() {
    if (!this.countries) {
      const importCountries = require('../json/country_dial_info.json');
      this.countries = importCountries.map((country) => ({
        value: country.code,
        label: country.name,
      }));
    }
    return this.countries;
  }

  public getDialCodeCountries() {
    if (!this.countries) {
      const importCountries = require('../json/country_dial_info.json');
      this.countries = importCountries.map((country) => ({
        value: country.dial_code,
        label: country.code,
      })).sort((a, b) => ('' + a.label).localeCompare(b.label));
    }
    return this.countries;
  }
}
