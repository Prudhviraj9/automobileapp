import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SignUp } from '../signup/signup';

@Component({
  selector: 'page-home',
  templateUrl: 'login.html'
})

export class LoginPage {

  constructor(public navCtrl: NavController) {

  }

  openSignupPage() {
    this.navCtrl.setRoot(SignUp);
  }
}
