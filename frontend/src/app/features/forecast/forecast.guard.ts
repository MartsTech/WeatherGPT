import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { City, Country, State } from 'country-state-city';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForecastGuard {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const country = route.queryParamMap.get('country');
    const state = route.queryParamMap.get('state');
    const city = route.queryParamMap.get('city');

    if (
      !country ||
      !state ||
      !city ||
      !Country.getCountryByCode(country) ||
      !State.getStateByCodeAndCountry(state, country) ||
      !City.getCitiesOfState(country, state)?.find(c => c.name === city)
    ) {
      this.router.navigate(['']);
      return false;
    }

    return true;
  }
}
