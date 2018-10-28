import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';

import * as fromApp from '../store/app-reducer';
import * as fromAuth from '../auth/store/auth-reducers';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private store: Store<fromApp.AppState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //return this.authService.isAuthenticated();
    return this.store.select('auth').map( (authState: fromAuth.State) => {
      return authState.authenticated;
    });
  }
}
