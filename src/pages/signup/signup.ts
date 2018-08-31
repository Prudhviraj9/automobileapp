import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'signup.html'
})
export class SignUp {

  constructor(public navCtrl: NavController) {

  }

  openSignupPage() {
    this.navCtrl.setRoot(LoginPage);
  }

}
