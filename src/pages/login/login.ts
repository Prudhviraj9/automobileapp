import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SignUp } from "../signup/signup";
import { ToastController } from 'ionic-angular';
import { AppointmentPage } from '../appointment/appointment';

@Component({
  selector: 'page-home',
  templateUrl: 'login.html'
})

export class LoginPage {

  private loginForm: FormGroup;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public toastCtrl: ToastController) {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  submitLoginForm() {
    var data = this.loginForm.value;
    fetch("https://sleepy-oasis-76333.herokuapp.com/login", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, same-origin, *omit
      headers: {
        "Content-Type": "application/json; charset=utf-8"
        //"Content-Type": "application/x-www-form-urlencoded",
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then((res) => {
      console.log(res);
      res.text().then((val) => {
        console.log(val);
        let jsonResponse = JSON.parse(val);
        if(jsonResponse.message === "loggedIn") {
          this.initializeForm();
          this.navCtrl.setRoot(LoginPage);
          const toast = this.toastCtrl.create({
            message: 'Your are successfully Signed in',
            showCloseButton: true,
            closeButtonText: 'Ok'
          });
          toast.present();
          this.navCtrl.setRoot(AppointmentPage);
        } else {
          const toast = this.toastCtrl.create({
            message: 'Wrong Credentials',
            showCloseButton: true,
            closeButtonText: 'Ok'
          });
          toast.present();
        }
      })
    });
  }

  openSignupPage() {
    this.navCtrl.setRoot(SignUp);
  }
}
