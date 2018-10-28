import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import {Store} from '@ngrx/store';
import 'rxjs/add/operator/switchMap';

import * as fromApp from '../store/app-reducer';
import * as fromAuth  from '../auth/store/auth-reducers';

@Injectable()
export class AuthIntercetor implements HttpInterceptor {

    constructor(private authServicee: AuthService, private store: Store<fromApp.AppState>) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('interceted', req);
        

        //return next.handle(copiedRequest);

        return this.store.select('auth').take(1).switchMap( (authState: fromAuth.State) => {
            const copiedRequest = req.clone({params: req.params.append('auth', authState.token)});
            return next.handle(copiedRequest);
        });
    }
}