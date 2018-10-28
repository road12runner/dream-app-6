import { Ingredient } from './../../shared/ingredient.model';
import { Action } from '@ngrx/store';
export const ADD_INDREDIENT = 'ADD_INGREDIENT';
export const ADD_INDREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INDREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INDREDIENT = 'DELETE_INGREDIENT';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';

export class AddIngedient implements Action{
    readonly type = ADD_INDREDIENT;
    constructor(public payload: Ingredient){}
}

export class AddIngedients implements Action{
    readonly type = ADD_INDREDIENTS;
    constructor(public payload: Ingredient[]){}
}

export class UpdateIngedient implements Action{
    readonly type = UPDATE_INDREDIENT;
    constructor(public payload: {index: number, ingredient: Ingredient}){}
}

export class DeleteIngedient implements Action{
    readonly type = DELETE_INDREDIENT;
    constructor(public payload: number){}
}

export class StartEdit implements Action{
    readonly type = START_EDIT;
    constructor(public payload: number){}
}

export class StopEdit implements Action{
    readonly type = STOP_EDIT;
}

export type ShoppingListAction = AddIngedient | AddIngedients | DeleteIngedient | UpdateIngedient | StartEdit | StopEdit;