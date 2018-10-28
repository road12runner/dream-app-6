import { Action } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
import { Recipe } from './../recipe.model';

import * as recipeAction from './recipe.actions';
import * as fromApp from '../../store/app-reducer';
export interface State {
    recipes: Recipe[]
}

export interface FeatureState extends fromApp.AppState{
   recipes: State 
}

const initalState: State = {
    recipes : [
        new Recipe(
          'Tasty Schnitzel',
          'A super-tasty Schnitzel - just awesome!',
          'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
          [
            new Ingredient('Meat', 1),
            new Ingredient('French Fries', 20)
          ]),
        new Recipe('Big Fat Burger',
          'What else you need to say?',
          'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
          [
            new Ingredient('Buns', 2),
            new Ingredient('Meat', 1)
          ])
      ]
};

export function recipeReducer(state = initalState, action: recipeAction.RecipeActions) {
    switch(action.type) {
        case recipeAction.SET_RECIPES: 
            return {
                ...state,
                recipes: [...action.payload]
            };
        case recipeAction.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        case recipeAction.UPDATE_RECIPE:
            let recipe = state.recipes[action.payload.index];
            const updatedRecipe = {
                ...recipe,
                ...action.payload.recipe
            }
            const recipes = [...state.recipes];
            recipes[action.payload.index] = updatedRecipe;

            return {
                ...state,
                recipes
            };
        case recipeAction.DELETE_RECIPE:
            let updatedRecipes = [...state.recipes];
            updatedRecipes.splice(action.payload, 1);
            return {
                ...state,
                recipes: [...updatedRecipes]
            };

        default:
            return state;
    }
}