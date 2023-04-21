import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Country, ICountry } from 'country-state-city';

@Component({
  standalone: true,
  selector: 'app-city-picker',
  imports: [NgSelectModule, FormsModule],
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
