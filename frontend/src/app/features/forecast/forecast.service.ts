import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import type { IForecast, IForecastSummary } from './forecast-types';

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  constructor(private http: HttpClient) {}

  getWeatherForecastSummary(
    lat: number,
    lon: number
  ): Observable<IForecastSummary> {
    return this.http.get<IForecastSummary>(
      `weather/forecast/${lat}/${lon}/summary`
    );
  }

  getWeatherForecast(lat: number, lon: number): Observable<IForecast> {
    return this.http.get<IForecast>(`weather/forecast/${lat}/${lon}`);
  }
}
