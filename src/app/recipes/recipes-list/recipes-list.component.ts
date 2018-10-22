import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {
  // recipes: Recipe[] = [
  //   new Recipe('Pizza recipe', 'Simple pizza', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Supreme_pizza.jpg/800px-Supreme_pizza.jpg'),
  //   new Recipe('Pasta recipe', 'Simple pasta', 'https://kak-vkusno.com/content/catalog/recepti/vtorie_blyuda/pasta_lazanya_makaroni/kak_prigotovit_italyanskuyu_pastu_%C2%ABkarbonara%C2%BB/thumb_350_270_c_pasta-karbonara.Jpeg')
  // ];

  recipes: Recipe[] = [];


  @Output() selectedRecipe = new EventEmitter<Recipe>();

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }

  onRecipeSelected(recipe: Recipe) {
    console.log('onRecipeSelected', recipe);
    this.selectedRecipe.emit(recipe);
  }

  onNewRecipe() {
    console.log('navigate');
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
