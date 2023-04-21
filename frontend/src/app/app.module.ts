import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';

import { RoutingModule } from '@core/routing/routing.module';

import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, NgSelectModule, RoutingModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
