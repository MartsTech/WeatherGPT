import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { City, Country } from 'country-state-city';
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
    const city = route.queryParamMap.get('city');

    if (
      !country ||
      !city ||
      !Country.getCountryByCode(country) ||
      !City.getCitiesOfCountry(country)?.find(c => c.name === city)
    ) {
      this.router.navigate(['']);
      return false;
    }

    return true;
  }
}
