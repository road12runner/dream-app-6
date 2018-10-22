//import { EventEmitter } from '@angular/core';
import { Ingredient } from './../shared/ingredient.module';
import { Subject } from 'rxjs/Subject';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
export class ShoppingListService {

    //ingredientsChanges = new EventEmitter<Ingredient[]>();
    ingredientsChanges = new Subject<Ingredient[]>();
    private ingredients: Ingredient[] =  [
        new Ingredient('Milk', 10),
        new Ingredient('Honey', 2)
    ];

    startedEditing = new Subject<number>(); 

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
       this.ingredients.push(ingredient);
       this.ingredientsChanges.next(this.getIngredients());
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients)
        this.ingredientsChanges.next(this.getIngredients());
        
     }
     updateIngredient(index: number, ingredient: Ingredient) {
        this.ingredients[index] = ingredient;
        this.ingredientsChanges.next(this.getIngredients());
     }
 
     getIngredient(id: number) {
         return  this.ingredients[id];
     }

    deleteIngredient(index:number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanges.next(this.getIngredients());
    }

}