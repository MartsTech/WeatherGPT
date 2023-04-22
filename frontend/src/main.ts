import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { AppComponent } from '@app/app.component';
import { apiInterceptor } from '@core/api/api.interceptor';
import { routes } from '@core/routing';
import { ForecastService } from '@features/forecast/forecast.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiInterceptor])),
    ForecastService,
  ],
}).catch(err => console.error(err));
