import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICity, ICountry } from 'country-state-city';

import { CardComponent } from '@shared/components/card/card.component';
import { CityPickerComponent } from '@shared/components/city-picker/city-picker.component';
import { CityPickedEvent } from '@shared/components/city-picker/city-types';
import { DividerComponent } from '@shared/components/divider/divider.component';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { TitleComponent } from '@shared/components/title/title.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    CardComponent,
    TitleComponent,
    SubtitleComponent,
    DividerComponent,
    CityPickerComponent,
  ],
  template: `
    <div
      class="flex min-h-screen flex-col justify-center bg-gradient-to-br from-[#394F68] to-[#183B7E] p-10">
      <div class="mx-auto w-full max-w-4xl">
        <app-card>
          <div class="mb-10 text-center">
            <app-title>WeatherGPT</app-title>
          </div>
          <div class="text-center">
            <app-subtitle>Weather Forecasting with GPT-3</app-subtitle>
          </div>
          <div class="my-10">
            <app-divider></app-divider>
          </div>
          <app-card background="blue">
            <app-city-picker
              (onCityPicked)="onComplete($event)"></app-city-picker>
          </app-card>
        </app-card>
      </div>
    </div>
  `,
})
export class HomeComponent {
  selectedCountry: ICountry | null = null;
  selectedCity: ICity | null = null;

  constructor(private router: Router) {}

  onComplete(event: CityPickedEvent) {
    this.router.navigate(['forecast'], {
      queryParams: {
        country: event.country.isoCode,
        city: event.city.name,
      },
    });
  }
}
