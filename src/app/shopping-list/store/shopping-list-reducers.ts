import {Action} from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListAction  from './shopping-list-actions';

export interface State {
    ingredients: Ingredient[],
    editedIngredient: Ingredient,
    editedIngredientIndex: number
}

const initialState: State = {
    ingredients : [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ],
    editedIngredient: null,
    editedIngredientIndex: -1
}


export function shoppinListReducer(state = initialState, action: ShoppingListAction.ShoppingListAction) {
    switch(action.type) {
        case ShoppingListAction.ADD_INDREDIENT: 
            return {
                ...state, 
                ingredients: [...state.ingredients, action.payload]
            }
        case ShoppingListAction.ADD_INDREDIENTS:
            return {
                ...state, 
                ingredients: [...state.ingredients, ...action.payload]
            }
        case ShoppingListAction.UPDATE_INDREDIENT:
            const ingredient = state.ingredients[action.payload.index];
            const updateIngredient = {
                ...ingredient,
                ...action.payload.ingredient
            };
            const ingredients = [...state.ingredients];
            ingredients[action.payload.index] = updateIngredient;

            return {
                ...state,
                ingredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        case ShoppingListAction.DELETE_INDREDIENT: 
            let updatedIngredients = [...state.ingredients];
            updatedIngredients.splice(action.payload, 1);
            return {
                ...state, 
                ingredients: updatedIngredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        case ShoppingListAction.START_EDIT:
            const editedIngredient = {...state.ingredients[action.payload]};
            return {
                ...state,
                editedIngredient,
                editedIngredientIndex: action.payload
            };
        case ShoppingListAction.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            }

        default:
            return state;
    }
    return state;
}