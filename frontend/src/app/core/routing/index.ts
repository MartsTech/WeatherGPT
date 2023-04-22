import type { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

import { ForecastGuard } from '@features/forecast/forecast.guard';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@features/home/home.component').then(mod => mod.HomeComponent),
  },
  {
    path: 'forecast',
    loadComponent: () =>
      import('@features/forecast/forecast.component').then(
        mod => mod.ForecastComponent
      ),
    canActivate: [ForecastGuard],
  },
];

export default provideRouter(routes);
