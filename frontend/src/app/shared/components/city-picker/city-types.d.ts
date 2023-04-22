import type { ICity, ICountry } from 'country-state-city';

export interface CityPickedEvent {
  country: ICountry;
  city: ICity;
}
