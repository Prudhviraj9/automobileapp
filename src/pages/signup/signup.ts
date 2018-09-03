import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginPage } from "../login/login";
import { ToastController } from 'ionic-angular';

@Component({
  selector: "page-home",
  templateUrl: "signup.html"
})
export class SignUp {
  private signupForm: FormGroup;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public toastCtrl: ToastController) {
    this.initializeForm();
  }

  initializeForm() {
    this.signupForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required]
    });
  }

  submitSignupForm() {
    var data = this.signupForm.value;
    fetch("https://sleepy-oasis-76333.herokuapp.com/user", {
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
        if(jsonResponse.message === "signedUp") {
          this.initializeForm();
          this.navCtrl.setRoot(LoginPage);
          const toast = this.toastCtrl.create({
            message: 'Your are successfully Signed up, please login',
            showCloseButton: true,
            closeButtonText: 'Ok'
          });
          toast.present();
        } else {
          const toast = this.toastCtrl.create({
            message: 'User Name exists, please use a different one',
            showCloseButton: true,
            closeButtonText: 'Ok'
          });
          toast.present();
        }
      })
    });
  }

  openSignupPage() {
    this.navCtrl.setRoot(LoginPage);
  }
}
