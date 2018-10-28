import { RecipeEffects } from './store/recipe.effects';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from '@angular/forms';

import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesComponent } from "./recipes.component";
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { AppRoutingModule } from "../app-routing.module";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { SharedModule } from "../shared/shared.module";
import { StoreModule } from "@ngrx/store";
//import { DropdownDirective } from '../shared/dropdown.directive';

import * as fromRecipe from '../recipes/store/recipe.reducer';

@NgModule({
  declarations: [
   RecipesComponent,
   RecipeStartComponent,
   RecipeListComponent,
   RecipeEditComponent,
   RecipeDetailComponent,
   RecipeItemComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RecipesRoutingModule,
    SharedModule,
    StoreModule.forFeature('recipes', fromRecipe.recipeReducer),
    EffectsModule.forFeature([RecipeEffects])
  ]  
})
export class RecipesModule {

}