import { Recipe } from './../../recipe.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.scss']
})
export class RecipesItemComponent implements OnInit {
  
  @Input() recipe: Recipe;
  @Input() index: number;
  //@Output() recipeSelected = new EventEmitter<Recipe>();

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  // onSelected() {
  //   //this.recipeSelected.emit(this.recipe);
  //   this.recipeService.recipeSelected.emit(this.recipe);
  // }

}
