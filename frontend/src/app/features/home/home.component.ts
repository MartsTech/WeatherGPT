import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
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
          <app-card background="blue"></app-card>
        </app-card>
      </div>
    </div>
  `,
})
export class HomeComponent {}
