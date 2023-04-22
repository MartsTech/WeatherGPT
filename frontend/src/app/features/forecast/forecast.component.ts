import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { City, Country, ICity, ICountry } from 'country-state-city';

import { CalloutComponent } from '@shared/components/callout/callout.component';
import { MetricComponent } from '@shared/components/metric/metric.component';

import type { IForecast } from './forecast-types';
import { ForecastService } from './forecast.service';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [NgIf, CalloutComponent, MetricComponent],
  template: `
    <div *ngIf="!!forecast">
      <div>
        <div class="p-5">
          <div class="pb-5">
            <h2 class="text-xl font-bold">Todays Overview</h2>
            <p *ngIf="!!lastUpdated" class="text-sm text-gray-400">
              Last Updated at {{ lastUpdated }} {{ forecast.timezone }}
            </p>
          </div>
          <div class="m-2 mb-10">
            <app-callout></app-callout>
          </div>
          <div class="m-2 grid grid-cols-1 gap-5 xl:grid-cols-2">
            <app-metric
              *ngIf="!!maxTemperature"
              title="Maximum Temperature"
              [value]="maxTemperature"
              color="yellow"></app-metric>
            <app-metric
              *ngIf="!!minTemperature"
              title="Minimum Temperature"
              [value]="minTemperature"
              color="green"></app-metric>
            <div>
              <app-metric
                *ngIf="!!uvIndex"
                title="UV Index"
                [value]="uvIndex"
                color="rose"></app-metric>
              <app-callout
                *ngIf="isUvIndexHigh"
                [warning]="true"
                title="The UV is high today, be sure to wear SPF!"></app-callout>
            </div>
            <div class="grid grid-cols-2 space-x-3">
              <app-metric
                *ngIf="!!windSpeed"
                title="Wind Speed"
                [value]="windSpeed"
                color="cyan"></app-metric>
              <app-metric
                *ngIf="!!windDirection"
                title="Wind Direction"
                [value]="windDirection"
                color="violet"></app-metric>
            </div>
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
  maxTemperature: string | null = null;
  minTemperature: string | null = null;
  uvIndex: string | null = null;
  isUvIndexHigh: boolean = false;
  windSpeed: string | null = null;
  windDirection: string | null = null;

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

          this.maxTemperature = data.daily.temperature_2m_max
            ? data.daily.temperature_2m_max[0].toFixed(1)
            : null;

          this.minTemperature = data.daily.temperature_2m_min
            ? data.daily.temperature_2m_min[0].toFixed(1)
            : null;

          this.uvIndex = data.daily.uv_index_max
            ? data.daily.uv_index_max[0].toFixed(1)
            : null;

          this.isUvIndexHigh = data.daily.uv_index_max
            ? data.daily.uv_index_max[0] > 5
            : false;

          this.windSpeed = data.current_weather.windspeed.toFixed(1) + ' m/s';

          this.windDirection =
            data.current_weather.winddirection.toFixed(1) + '°';
        });
    });
  }
}
