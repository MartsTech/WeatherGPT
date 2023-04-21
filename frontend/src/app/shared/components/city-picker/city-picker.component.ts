import { Component } from '@angular/core';
import { Country, ICountry } from 'country-state-city';

@Component({
  selector: 'app-city-picker',
  template: `
    <ng-select
      [items]="countries"
      bindLabel="name"
      bindValue="name"
      [(ngModel)]="selectedCountry"
      [placeholder]="!selectedCountry ? 'Select...' : ''">
    </ng-select>
  `,
})
export class CityPickerComponent {
  selectedCountry: string | null = null;
  countries: ICountry[] = [];

  constructor() {
    this.countries = Country.getAllCountries();
  }
}
