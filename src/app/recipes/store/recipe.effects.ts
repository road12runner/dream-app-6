import { FETCH_RECIPE } from './recipe.actions';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

import * as fromRecipe from '../store/recipe.reducer'; 
import * as recipeActions from '../store/recipe.actions';
import { Recipe } from '../recipe.model';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeEffects {
    
    @Effect()
    recipeFetch = this.actions$.ofType(recipeActions.FETCH_RECIPE)
    .switchMap( (action: recipeActions.FetchRecipe) => {
        return this.httpClient.get<Recipe[]>('https://dreamapp-16e31.firebaseio.com/recipes.json?', 
        {observe: 'body', responseType: 'json'});
    })
    .map(
        (recipes) => {
            for (let recipe of recipes) {
                if (!recipe['ingredients']) {
                    recipe['ingredients'] = [];
                }
            }
            return {
                type: recipeActions.FETCH_RECIPE,
                payload: recipes
            };
        }
    );
  
  
    @Effect({dispatch: false})
    recipeStore = this.actions$.ofType(recipeActions.STORE_RECIPE)
    .withLatestFrom( this.store.select('recipes'))
    .switchMap( ([action, state]) => {
        const req = new HttpRequest('PUT', 
        'https://dreamapp-16e31.firebaseio.com/recipes.json', 
        state.recipes);
  
        return this.httpClient.request(req);
  
    })

    constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store<fromRecipe.FeatureState>){}

}