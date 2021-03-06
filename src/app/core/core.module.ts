import { AuthIntercetor } from '../shared/auth.intercetor';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
@NgModule({
    declarations: [
        HeaderComponent, 
        HomeComponent
    ],
    imports:[
        SharedModule, 
        AppRoutingModule
    ], 
    exports: [
        AppRoutingModule,
        HeaderComponent,


    ],
    providers: [ShoppingListService, RecipeService, DataStorageService, AuthService, {provide: HTTP_INTERCEPTORS, useClass: AuthIntercetor, multi: true}]
})
export class CoreModule {}