import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { City, Country, ICity, ICountry } from 'country-state-city';

import { CalloutComponent } from '@shared/components/callout/callout.component';

import { IForecast } from './forecast-types';
import { ForecastService } from './forecast.service';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [NgIf, CalloutComponent],
  template: `
    <div *ngIf="forecast">
      <div>
        <div class="p-5">
          <div class="pb-5">
            <h2 class="text-xl font-bold">Todays Overview</h2>
            <p *ngIf="lastUpdated" class="text-sm text-gray-400">
              Last Updated at {{ lastUpdated }} {{ forecast.timezone }}
            </p>
          </div>

          <div>
            <app-callout></app-callout>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ForecastComponent implements OnInit {
  country: ICountry | null = null;
  city: ICity | null = null;
  forecast: IForecast | null = null;
  lastUpdated: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private forecastService: ForecastService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const country = params['country'];
      const city = params['city'];

      this.country = Country.getCountryByCode(country) || null;
      this.city =
        City.getCitiesOfCountry(country)?.find(c => c.name === city) || null;

      if (!this.country || !this.city) {
        return;
      }

      this.forecastService
        .getWeatherForecast(
          Number(this.city.latitude),
          Number(this.city.longitude)
        )
        .subscribe(data => {
          this.forecast = data;
          this.lastUpdated =
            new Date(data.current_weather.time).toLocaleString() || null;
        });
    });
  }
}
