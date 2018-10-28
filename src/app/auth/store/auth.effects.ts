import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';

import {fromPromise} from 'rxjs/observable/fromPromise';

import {Effect, Actions} from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import * as authActions from './auth-actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
    @Effect()
    authSignup = this.actions$.ofType(authActions.TRY_SIGNUP)
    .map( (action: authActions.TrySignup) => action.payload)
    .switchMap( (authData: {userName:string, password: string}) => {
        return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.userName, authData.password));
    })
    .switchMap( () => {
        return fromPromise(firebase.auth().currentUser.getIdToken())
    })
    .mergeMap( (token: string) => {
        this.router.navigate(['/']);
        return [
            {
                type: authActions.SIGNUP
            },
            {                
                type: authActions.SET_TOKEN,
                payload: token
            }
        ]
    });

    @Effect()
    authSignin = this.actions$.ofType(authActions.TRY_SIGNIN)
    .map( (action: authActions.TrySignin) => action.payload)
    .switchMap( (authData: {userName: string, password: string}) => {
        return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.userName, authData.password));
    })
    .switchMap( () => {
        return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    .mergeMap( (token: string) => {
        this.router.navigate(['/']);
        return [
            {
                type: authActions.SIGNUP
            },
            {
                type: authActions.SET_TOKEN,
                payload: token
            }
        ];
    })


    @Effect({dispatch: false})
    authLogout = this.actions$.ofType(authActions.LOGOUT)
        .do( () => {
            this.router.navigate(['/']);
        });

    constructor(private actions$ : Actions, private router: Router) {}
}