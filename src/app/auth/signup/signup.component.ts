import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Store} from '@ngrx/store';

import { AuthService } from '../auth.service';
import * as fromApp from '../../store/app-reducer';
import * as authActions from '../store/auth-actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService, private store:Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    //this.authService.signupUser(email, password);
    this.store.dispatch( new authActions.TrySignup({userName: email, password}));
  }

}
