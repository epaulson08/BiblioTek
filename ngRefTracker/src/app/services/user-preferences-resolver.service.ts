import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserPreferencesResolverService implements Resolve<string> {

  constructor() { }

  resolve(): string {
    console.warn("in resolver function");

    return localStorage.getItem("chosenPalette");
  }
}
