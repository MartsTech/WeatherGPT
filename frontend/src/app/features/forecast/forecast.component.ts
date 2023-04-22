import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { City, Country, ICity, ICountry } from 'country-state-city';
import { IForecast } from './forecast-types';
import { ForecastService } from './forecast.service';

@Component({
  selector: 'app-forecast',
  standalone: true,
  template: ` <p>forecast works!</p> `,
})
export class ForecastComponent implements OnInit {
  country: ICountry | null = null;
  city: ICity | null = null;
  forecast: IForecast | null = null;

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
        });
    });
  }
}
