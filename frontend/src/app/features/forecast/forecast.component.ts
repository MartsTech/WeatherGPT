import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { City, Country, ICity, ICountry } from 'country-state-city';

import { CalloutComponent } from '@shared/components/callout/callout.component';
import { CityPickerComponent } from '@shared/components/city-picker/city-picker.component';
import { CityPickedEvent } from '@shared/components/city-picker/city-types';
import { MetricComponent } from '@shared/components/metric/metric.component';
import { weatherCodes, weatherIcon } from '@shared/utils/weather';

import { MoonComponent } from '@shared/icons/moon/moon.component';
import { SunComponent } from '@shared/icons/sun/sun.component';
import { ForecastService } from './forecast.service';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [
    NgIf,
    CalloutComponent,
    MetricComponent,
    CityPickerComponent,
    SunComponent,
    MoonComponent,
  ],
  template: `
    <main class="flex min-h-screen flex-col md:flex-row">
      <section
        class="bg-gradient-to-br from-[#394F68] to-[#183B7E] p-10 text-white">
        <div class="pb-5">
          <h1 *ngIf="!!city && !!city.name" class="text-6xl font-bold">
            {{ city.name }}
          </h1>
          <p
            *ngIf="!!city?.longitude && !!city?.latitude"
            class="text-xs text-gray-400">
            Long/Lat: {{ city?.longitude }}, {{ city?.latitude }}
          </p>
        </div>
        <app-city-picker (onCityPicked)="onComplete($event)"></app-city-picker>
        <hr class="my-10" />
        <div class="my-5 flex items-center justify-between space-x-10">
          <div>
            <p class="text-xl">{{ currentDate }}</p>
            <p class="font-extralight">Timezone: {{ currentTimezone }}</p>
          </div>
          <p class="text-xl font-bold uppercase">{{ currentTime }}</p>
        </div>
        <hr class="mb-5 mt-10" />
        <div class="flex items-center justify-between">
          <div *ngIf="!!weatherCodeIcon && !!weatherCodeLabel">
            <img
              loading="lazy"
              src="{{ weatherCodeIcon }}"
              alt="{{ weatherCodeLabel }}"
              width="75"
              height="75" />
            <div class="flex items-center justify-between space-x-10">
              <p class="text-6xl font-semibold">{{ currTemperature }}</p>
              <p class="text-right text-lg font-extralight">
                {{ weatherCodeLabel }}
              </p>
            </div>
          </div>
        </div>
        <div class="space-y-2 py-5">
          <div
            class="flex items-center space-x-2 rounded-md border border-[#6F90CD] bg-[#405885] px-4 py-3">
            <app-sun></app-sun>
            <div class="flex flex-1 items-center justify-between">
              <p class="font-extralight">Sunrise</p>
              <p class="text-2xl uppercase">{{ sunrise }}</p>
            </div>
          </div>
          <div
            class="flex items-center space-x-2 rounded-md border border-[#6F90CD] bg-[#405885] px-4 py-3">
            <app-moon></app-moon>
            <div class="flex flex-1 items-center justify-between">
              <p class="font-extralight">Sunset</p>
              <p class="text-2xl uppercase">{{ sunset }}</p>
            </div>
          </div>
        </div>
      </section>
      <section class="flex-1 p-5 lg:p-10">
        <div class="p-5">
          <div class="pb-5">
            <h2 class="text-xl font-bold">Todays Overview</h2>
            <p
              *ngIf="!!lastUpdated && !!timezone"
              class="text-sm text-gray-400">
              Last Updated at {{ lastUpdated }} {{ timezone }}
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
        <hr class="mb-5" />
        <div class="space-y-3"></div>
      </section>
    </main>
  `,
})
export class ForecastComponent implements OnInit {
  country: ICountry | null = null;
  city: ICity | null = null;
  lastUpdated: string | null = null;
  timezone: string | null = null;
  maxTemperature: string | null = null;
  minTemperature: string | null = null;
  currTemperature: string | null = null;
  uvIndex: string | null = null;
  isUvIndexHigh: boolean = false;
  windSpeed: string | null = null;
  windDirection: string | null = null;
  currentDate = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  currentTime = new Date().toLocaleTimeString('en-GB', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  weatherCodeLabel: string | null = null;
  weatherCodeIcon: string | null = null;
  sunrise: string | null = null;
  sunset: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
          this.lastUpdated =
            new Date(data.current_weather.time).toLocaleString() || null;

          this.timezone = data.timezone || null;

          this.maxTemperature = data.daily.temperature_2m_max
            ? data.daily.temperature_2m_max[0].toFixed(1)
            : null;

          this.minTemperature = data.daily.temperature_2m_min
            ? data.daily.temperature_2m_min[0].toFixed(1)
            : null;

          this.currTemperature =
            data.current_weather.temperature.toFixed(1) + '°C';

          this.uvIndex = data.daily.uv_index_max
            ? data.daily.uv_index_max[0].toFixed(1)
            : null;

          this.isUvIndexHigh = data.daily.uv_index_max
            ? data.daily.uv_index_max[0] > 5
            : false;

          this.windSpeed = data.current_weather.windspeed.toFixed(1) + ' m/s';

          this.windDirection =
            data.current_weather.winddirection.toFixed(1) + '°';

          this.weatherCodeLabel =
            weatherCodes[data.current_weather.weathercode].label;

          this.weatherCodeIcon = weatherIcon(
            weatherCodes[data.current_weather.weathercode].icon
          );

          this.sunrise = data.daily.sunrise
            ? new Date(data.daily.sunrise[0]).toLocaleTimeString('en-GB', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })
            : null;

          this.sunset = data.daily.sunset
            ? new Date(data.daily.sunset[0]).toLocaleTimeString('en-GB', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })
            : null;
        });
    });
  }

  onComplete(event: CityPickedEvent) {
    this.router.navigate(['forecast'], {
      queryParams: {
        country: event.country.isoCode,
        city: event.city.name,
      },
    });
  }
}
