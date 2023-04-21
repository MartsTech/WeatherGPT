import type { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@features/home/home.component').then(mod => mod.HomeComponent),
  },
];

export default provideRouter(routes);
