import { Injectable } from '@angular/core';

export interface CountryType {
  value: string;
  label: string;
}

@Injectable({ providedIn: 'root' })
export class CountryService {
  private countries: CountryType[];

  public getCountriesData() {
    if (!this.countries) {
      const importCountries = require('../json/country_dial_info.json');
      this.countries = importCountries.map((country) => ({
        value: country.code,
        label: country.name,
        flat: country.flag,
        code: country.dial_code
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
      const importCountries = require('../jsons/country_dial_info.json');
      this.countries = importCountries.map((country) => ({
        value: country.dial_code,
        label: country.code,
      })).sort((a, b) => ('' + a.label).localeCompare(b.label));
    }
    return this.countries;
  }
}
