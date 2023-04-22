import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { City, Country, ICity, ICountry } from 'country-state-city';

import { GlobeComponent } from '@shared/icons/globe/globe.component';

import { ActivatedRoute } from '@angular/router';
import { CityPickedEvent } from './city-types';

@Component({
  standalone: true,
  selector: 'app-city-picker',
  imports: [NgIf, NgFor, NgSelectModule, FormsModule, GlobeComponent],
  template: `
    <div class="space-y-4">
      <div class="space-y-2">
        <div class="flex items-center space-x-2 text-white/80">
          <app-globe></app-globe>
          <label [htmlFor]="selectedCountry">Country</label>
        </div>
        <ng-select
          [(ngModel)]="selectedCountry"
          (ngModelChange)="onCountryChange()"
          [placeholder]="!selectedCity ? 'Select...' : ''"
          >>
          <ng-option *ngFor="let country of countries" [value]="country">{{
            country.name
          }}</ng-option>
        </ng-select>
      </div>
      <div class="space-y-2" *ngIf="selectedCountry">
        <div class="flex items-center space-x-2 text-white/80">
          <app-globe></app-globe>
          <label [htmlFor]="selectedCity">City</label>
        </div>
        <ng-select
          [(ngModel)]="selectedCity"
          (ngModelChange)="onCityChange()"
          [placeholder]="!selectedCity ? 'Select...' : ''"
          >>
          <ng-option *ngFor="let city of cities" [value]="city">{{
            city.name
          }}</ng-option>
        </ng-select>
      </div>
    </div>
  `,
})
export class CityPickerComponent implements OnInit {
  @Output() onCityPicked = new EventEmitter<CityPickedEvent>();

  countries: ICountry[] = [];
  selectedCountry: ICountry | null = null;
  cities: ICity[] = [];
  selectedCity: ICity | null = null;

  constructor(private route: ActivatedRoute) {
    this.countries = Country.getAllCountries();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const country = params['country'];
      const city = params['city'];

      if (typeof country !== 'string' || typeof city !== 'string') {
        return;
      }

      this.selectedCountry =
        this.countries.find(x => x.isoCode === country) || null;

      this.cities = City.getCitiesOfCountry(country) || [];

      this.selectedCity = this.cities?.find(x => x.name === city) || null;
    });
  }

  onCountryChange() {
    if (this.selectedCountry) {
      this.cities = City.getCitiesOfCountry(this.selectedCountry.isoCode) || [];
    } else {
      this.cities = [];
    }
  }

  onCityChange() {
    if (this.selectedCountry && this.selectedCity) {
      this.onCityPicked.emit({
        country: this.selectedCountry,
        city: this.selectedCity,
      });
    }
  }
}
