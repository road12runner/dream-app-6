import { ShoppingListAction } from './../../shopping-list/store/shopping-list-actions';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

import * as fromRecipe from '../store/recipe.reducer';
import * as recipeActions from '../store/recipe.actions';

import * as shoppingListActions from '../../shopping-list/store/shopping-list-actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeState: Observable<fromRecipe.State>;
  id: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router, 
              private store: Store<fromRecipe.FeatureState>
            ) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          //this.recipe = this.recipeService.getRecipe(this.id);
          this.recipeState = this.store.select('recipes');
        }
      );
  }

  onAddToShoppingList() {
    this.store.select('recipes')
      .take(1)
      .subscribe( (recipeState: fromRecipe.State) => {
        this.store.dispatch(
          new shoppingListActions.AddIngedients(recipeState.recipes[this.id].ingredients));
      });
    //this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    //this.recipeService.deleteRecipe(this.id);
    this.store.dispatch( new recipeActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }

}
