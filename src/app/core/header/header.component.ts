import * as fromApp from './../../store/app-reducer';
import * as fromAuth from '../../auth/store/auth-reducers';

import { Component, OnInit } from '@angular/core';
//import { Response } from '@angular/http';
import { HttpEvent } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';

import * as authActions from '../../auth/store/auth-actions';
import * as recipeAction from  '../../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit{
  
  auths: AuthService;
  authState: Observable<fromAuth.State>;

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService,
            private store: Store<fromApp.AppState>) {
    this.auths = authService;
  }

  ngOnInit() {
    this.authState = this.store.select('auth')
  }
  onSaveData() {
    this.store.dispatch(new recipeAction.StoreRecipe());
    // this.dataStorageService.storeRecipes()
    //   .subscribe(
    //     (response) => {
    //       console.log(response);
    //     }
    //   );
  }

  onFetchData() {
    //this.dataStorageService.getRecipes();
    this.store.dispatch(new recipeAction.FetchRecipe());
  }

  onLogout() {
    this.store.dispatch(new authActions.Logout());
    //this.auths.logout();
  }
}
