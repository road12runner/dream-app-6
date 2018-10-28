import { AuthEffects } from './auth/store/auth.effects';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {StoreRouterConnectingModule} from '@ngrx/router-store';

import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';

import {reducers} from './store/app-reducer';
import { EffectsModule } from '@ngrx/effects';

import { environment } from './../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    //HttpModule,
    HttpClientModule,
    AppRoutingModule,
    ShoppingListModule,
    AuthModule,
    SharedModule, 
    CoreModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects]),
    StoreRouterConnectingModule,

    !environment.production ? StoreDevtoolsModule.instrument() : []

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
