import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FeaturesModule } from './features/features.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [BrowserModule, CoreModule, FeaturesModule, SharedModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
