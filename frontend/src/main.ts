import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from '@app/app.component';
import routing from '@core/routing';

bootstrapApplication(AppComponent, {
  providers: [routing],
}).catch(err => console.error(err));
