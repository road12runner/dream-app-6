import * as ShoppingListAction from './store/shopping-list-actions';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromApp from '../store/app-reducer';

@Injectable()
export class ShoppingListService {
  private ingredients: Ingredient[];

  shoopingListState: Observable<{ingredients: Ingredient[]}>;
  constructor(private store: Store<fromApp.AppState>){
    //store.    
  }

  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();


  // private ingredients: Ingredient[] = [
  //   new Ingredient('Apples', 5),
  //   new Ingredient('Tomatoes', 10),
  // ];

  

  getIngredients() {
    //this.store.in
    //return this.ingredients.slice();
  }

  getIngredient(index: number) {
    //return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    // this.ingredients.push(ingredient);
    // this.ingredientsChanged.next(this.ingredients.slice());

    this.store.dispatch(new ShoppingListAction.AddIngedient(ingredient));
  }

  addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    // this.ingredients.push(...ingredients);
    // this.ingredientsChanged.next(this.ingredients.slice());
    this.store.dispatch(new ShoppingListAction.AddIngedients(ingredients));
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    // this.ingredients[index] = newIngredient;
    // this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    // this.ingredients.splice(index, 1);
    // this.ingredientsChanged.next(this.ingredients.slice());
    this.store.dispatch(new ShoppingListAction.DeleteIngedient(index));
  }
}
