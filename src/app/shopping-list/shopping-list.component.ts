import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from './../shared/ingredient.module';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  // ingredients: Ingredient[] = [
  //   new Ingredient('Milk', 10),
  //   new Ingredient('Honey', 2)
  // ];

  ingredients: Ingredient[] = [];
  private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    
    this.subscription = this.shoppingListService.ingredientsChanges.subscribe( (ingredients:Ingredient[]) => this.ingredients = ingredients);
  }

  // onIngredientAdded(ingredient: Ingredient) {
  //   this.ingredients.push(ingredient);
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onEditItem(id: number) {
    this.shoppingListService.startedEditing.next(id);
  }
}
