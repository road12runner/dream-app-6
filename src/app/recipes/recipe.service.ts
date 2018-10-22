import { Ingredient } from './../shared/ingredient.module';
import { Recipe } from "./recipe.model";
import { EventEmitter, Injectable } from "@angular/core";
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

    constructor(private shoppingListService: ShoppingListService){
        
    }

    //recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('Pizza recipe', 'Simple pizza', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Supreme_pizza.jpg/800px-Supreme_pizza.jpg',
        [new Ingredient('meat', 1), new Ingredient('eggs', 20)]
    ),
        new Recipe('Pasta recipe', 'Simple pasta', 'https://kak-vkusno.com/content/catalog/recepti/vtorie_blyuda/pasta_lazanya_makaroni/kak_prigotovit_italyanskuyu_pastu_%C2%ABkarbonara%C2%BB/thumb_350_270_c_pasta-karbonara.Jpeg', 
        [new Ingredient('banana', 3), new Ingredient('yougurt', 2)])
      ];
    
    getRecipes() {
        return this.recipes.slice();
    }

    addIngredients(ingredients: Ingredient[]) {
        console.log('ingredients', ingredients);
        this.shoppingListService.addIngredients(ingredients);
    }

    getRecipeById(id: number) {
        return this.recipes[id];
    } 

}