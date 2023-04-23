import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  City,
  Country,
  ICity,
  ICountry,
  IState,
  State,
} from 'country-state-city';

import { GlobeComponent } from '@shared/icons/globe/globe.component';

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
          <label [htmlFor]="selectedCity">State</label>
        </div>
        <ng-select
          [(ngModel)]="selectedState"
          (ngModelChange)="onStateChange()"
          [placeholder]="!selectedState ? 'Select...' : ''"
          >>
          <ng-option *ngFor="let state of states" [value]="state">{{
            state.name
          }}</ng-option>
        </ng-select>
      </div>
      <div class="space-y-2" *ngIf="selectedCountry && selectedState">
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
  countries: ICountry[] = [];
  selectedCountry: ICountry | null = null;
  states: IState[] = [];
  selectedState: IState | null = null;
  cities: ICity[] = [];
  selectedCity: ICity | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.countries = Country.getAllCountries();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const country = params['country'];
      const state = params['state'];
      const city = params['city'];

      if (
        typeof country !== 'string' ||
        typeof state !== 'string' ||
        typeof city !== 'string'
      ) {
        return;
      }

      this.selectedCountry = Country.getCountryByCode(country) || null;

      this.states = State.getStatesOfCountry(country) || [];

      this.selectedState =
        State.getStateByCodeAndCountry(state, country) || null;

      this.cities = City.getCitiesOfState(country, state) || [];

      this.selectedCity =
        City.getCitiesOfState(country, state).find(i => i.name === city) ||
        null;
    });
  }

  onCountryChange() {
    if (this.selectedCountry) {
      this.states =
        State.getStatesOfCountry(this.selectedCountry.isoCode) || [];
    } else {
      this.states = [];
    }
    this.cities = [];
  }

  onStateChange() {
    if (this.selectedCountry && this.selectedState) {
      this.cities =
        City.getCitiesOfState(
          this.selectedCountry.isoCode,
          this.selectedState.isoCode
        ) || [];
    } else {
      this.cities = [];
    }
  }

  onCityChange() {
    if (this.selectedCountry && this.selectedState && this.selectedCity) {
      this.router.navigate(['forecast'], {
        queryParams: {
          country: this.selectedCountry.isoCode,
          state: this.selectedState.isoCode,
          city: this.selectedCity.name,
        },
      });
    }
  }
}
